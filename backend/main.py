from fastapi import FastAPI, HTTPException, Query, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, get_conn
from database_firebase import get_firestore_db
from schemas import OrderCreateSchema, OrderUpdateSchema, PaymentCreateSchema, PostCreateSchema
import sqlite3
from datetime import datetime, date
from pdf_services import generate_order_pdf_bytes, merge_pdfs, generate_daily_report_pdf, _calc_daily_rows
import tempfile
import os
import shutil
import io
import re
from PIL import Image
import uuid

app = FastAPI(title="Mooncake App API v7 - Web Full")

PRODUCTS = [
    ("Da dợp 2 trứng", 125000),
    ("Da dợp 3 trứng", 160000),
    ("Trung thu thập cẩm 2 trứng", 125000),
    ("Trung thu Đậu xanh 2 trứng", 125000),
    ("Trung thu Dừa Mè 2 trứng", 110000),
    ("Trung thu Gà Quay 2 trứng", 135000),
    ("Trung thu thập cẩm 3 trứng", 150000),
    ("Trung thu Đậu xanh 3 trứng", 150000),
    ("Da dợp 6 trứng", 450000),
    ("Da dợp 10 trứng", 600000),
    ("Da dợp 12 Trứng", 660000),
    ("Da dợp 14 Trứng", 720000),
    ("Da dợp chay", 125000),
    ("Da dợp chay lớn", 660000),
    ("Trung Thu Nướng chay", 125000),
]

@app.on_event("startup")
def startup_event():
    init_db()
    try:
        get_firestore_db()
        print("🔥 Firebase Firestore initialized successfully!")
    except Exception as e:
        print(f"⚠️ Firebase initialization skipped or fallback to SQLite: {e}")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "uploads")
os.makedirs(upload_dir, exist_ok=True)
app.mount("/api/uploads", StaticFiles(directory=upload_dir), name="uploads")

@app.get("/")
def read_root():
    return {"message": "Welcome to Mooncake App API"}

@app.get("/api/pos_products")
def get_products():
    return [{"name": p[0], "price": p[1]} for p in PRODUCTS]

@app.get("/api/orders")
def get_orders(
    from_date: str = Query(None), 
    to_date: str = Query(None), 
    keyword: str = Query(None)
):
    con = get_conn()
    cur = con.cursor()
    
    sql = """
        SELECT o.id, o.order_date, c.name, c.phone, o.shipping_fee, o.discount, o.notes, o.receive_date
        FROM orders o JOIN customers c ON o.customer_id=c.id
        WHERE 1=1
    """
    params = []
    if from_date:
        sql += " AND date(o.order_date) >= date(?)"
        params.append(from_date)
    if to_date:
        sql += " AND date(o.order_date) <= date(?)"
        params.append(to_date)
    if keyword:
        sql += " AND (c.name LIKE ? OR c.phone LIKE ? OR CAST(o.id AS TEXT) LIKE ?)"
        params.extend([f"%{keyword}%", f"%{keyword}%", f"%{keyword}%"])
        
    sql += " ORDER BY o.id DESC"
    cur.execute(sql, params)
    rows = cur.fetchall()
    
    results = []
    for row in rows:
        oid = row['id']
        cur.execute("SELECT product_name, unit_price, quantity FROM order_items WHERE order_id=?", (oid,))
        items = cur.fetchall()
        tot_items = sum(i['unit_price'] * i['quantity'] for i in items)
        total = max(0, tot_items + (row['shipping_fee'] or 0) - (row['discount'] or 0))
        
        cur.execute("SELECT COALESCE(SUM(amount),0) FROM payments WHERE order_id=?", (oid,))
        paid = cur.fetchone()[0] or 0
        due = total - paid
        
        results.append({
            "id": oid,
            "order_date": row['order_date'],
            "receive_date": row['receive_date'],
            "customer_name": row['name'],
            "customer_phone": row['phone'],
            "tot_items": tot_items,
            "shipping_fee": row['shipping_fee'],
            "discount": row['discount'],
            "total": total,
            "paid": paid,
            "due": max(0, due),
            "notes": row['notes'],
            "items": [{"name": i['product_name'], "price": i['unit_price'], "quantity": i['quantity']} for i in items]
        })
    con.close()
    return results

@app.get("/api/orders/{order_id}")
def get_order(order_id: int):
    con = get_conn()
    cur = con.cursor()
    cur.execute("""
        SELECT o.order_date, o.receive_date, o.shipping_fee, o.discount, o.notes,
               c.name as customer_name, c.phone as customer_phone, c.address as customer_address, o.id
        FROM orders o
        JOIN customers c ON o.customer_id=c.id
        WHERE o.id=?
    """, (order_id,))
    row = cur.fetchone()
    if not row:
        con.close()
        raise HTTPException(status_code=404, detail="Order not found")
        
    cur.execute("SELECT product_name, unit_price, quantity FROM order_items WHERE order_id=?", (order_id,))
    items = cur.fetchall()
    
    cur.execute("SELECT COALESCE(SUM(amount), 0) FROM payments WHERE order_id=? AND type='deposit'", (order_id,))
    dep = cur.fetchone()[0]
    
    con.close()
    
    result = dict(row)
    result['deposit'] = dep
    result['items'] = [{"product_name": i['product_name'], "unit_price": i['unit_price'], "quantity": i['quantity']} for i in items]
    return result

@app.post("/api/orders")
def create_order(order: OrderCreateSchema):
    con = get_conn()
    cur = con.cursor()
    try:
        cur.execute("SELECT id FROM customers WHERE phone=? AND name=?", (order.customer_phone, order.customer_name))
        row = cur.fetchone()
        if row:
            cust_id = row['id']
            cur.execute("UPDATE customers SET address=? WHERE id=?", (order.customer_address, cust_id))
        else:
            cur.execute("INSERT INTO customers(name, phone, address) VALUES(?,?,?)", 
                        (order.customer_name, order.customer_phone, order.customer_address))
            cust_id = cur.lastrowid
            
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cur.execute("""INSERT INTO orders(customer_id, order_date, receive_date, discount, shipping_fee, notes) 
                       VALUES(?,?,?,?,?,?)""",
                    (cust_id, now, order.receive_date, order.discount, order.shipping_fee, order.notes))
        order_id = cur.lastrowid
        
        for item in order.items:
            cur.execute("INSERT INTO order_items(order_id, product_name, unit_price, quantity) VALUES(?,?,?,?)",
                        (order_id, item.product_name, item.unit_price, item.quantity))
            
        paid_so_far = 0
        if order.deposit > 0:
            cur.execute("INSERT INTO payments(order_id, pay_date, amount, type, method) VALUES(?,?,?,?,?)",
                        (order_id, now, order.deposit, 'deposit', ''))
            paid_so_far += order.deposit
        
        if order.pay_ship_now and order.shipping_fee > 0:
            cur.execute("INSERT INTO payments(order_id, pay_date, amount, type, method) VALUES(?,?,?,?,?)",
                        (order_id, now, order.shipping_fee, 'shipping', ''))
            paid_so_far += order.shipping_fee
            
        subtotal = max(0, sum(i.unit_price * i.quantity for i in order.items) + order.shipping_fee - order.discount)
        if order.full_pay and subtotal - paid_so_far > 0:
            cur.execute("INSERT INTO payments(order_id, pay_date, amount, type, method) VALUES(?,?,?,?,?)",
                        (order_id, now, subtotal - paid_so_far, 'full', ''))
            
        con.commit()
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        con.close()
        
    return {"status": "success", "order_id": order_id}

@app.put("/api/orders/{order_id}")
def update_order(order_id: int, order: OrderUpdateSchema):
    con = get_conn()
    cur = con.cursor()
    try:
        cur.execute("SELECT id FROM customers WHERE phone=? AND name=?", (order.customer_phone, order.customer_name))
        row = cur.fetchone()
        if row:
            cust_id = row['id']
            cur.execute("UPDATE customers SET address=? WHERE id=?", (order.customer_address, cust_id))
        else:
            cur.execute("INSERT INTO customers(name, phone, address) VALUES(?,?,?)", 
                        (order.customer_name, order.customer_phone, order.customer_address))
            cust_id = cur.lastrowid
            
        cur.execute("UPDATE orders SET customer_id=?, receive_date=?, discount=?, shipping_fee=?, notes=? WHERE id=?",
                    (cust_id, order.receive_date, order.discount, order.shipping_fee, order.notes, order_id))
        
        cur.execute("DELETE FROM order_items WHERE order_id=?", (order_id,))
        for item in order.items:
            cur.execute("INSERT INTO order_items(order_id, product_name, unit_price, quantity) VALUES(?,?,?,?)",
                        (order_id, item.product_name, item.unit_price, item.quantity))
            
        cur.execute("DELETE FROM payments WHERE order_id=? AND type='deposit'", (order_id,))
        if order.deposit > 0:
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            cur.execute("INSERT INTO payments(order_id, pay_date, amount, type, method) VALUES(?,?,?,?,?)",
                        (order_id, now, order.deposit, 'deposit', ''))
                        
        con.commit()
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        con.close()
    return {"status": "success"}

@app.delete("/api/orders/{order_id}")
def delete_order(order_id: int):
    con = get_conn()
    cur = con.cursor()
    try:
        cur.execute("DELETE FROM payments WHERE order_id=?", (order_id,))
        cur.execute("DELETE FROM order_items WHERE order_id=?", (order_id,))
        cur.execute("DELETE FROM orders WHERE id=?", (order_id,))
        con.commit()
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        con.close()
    return {"status": "success"}

@app.get("/api/payments/{order_id}")
def get_payments(order_id: int):
    con = get_conn()
    cur = con.cursor()
    cur.execute("SELECT id, pay_date, amount, type, method FROM payments WHERE order_id=? ORDER BY id DESC", (order_id,))
    rows = cur.fetchall()
    
    cur.execute("SELECT shipping_fee, discount FROM orders WHERE id=?", (order_id,))
    ord_row = cur.fetchone()
    if not ord_row:
        con.close()
        raise HTTPException(status_code=404, detail="Order not found")
        
    cur.execute("SELECT unit_price, quantity FROM order_items WHERE order_id=?", (order_id,))
    items = cur.fetchall()
    tot_items = sum(i['unit_price'] * i['quantity'] for i in items)
    subtotal = max(0, tot_items + (ord_row['shipping_fee'] or 0) - (ord_row['discount'] or 0))
    paid = sum(r['amount'] for r in rows)
    outstanding = max(0, subtotal - paid)
    con.close()
    
    return {
        "payments": [dict(r) for r in rows],
        "summary": {
            "subtotal": subtotal,
            "paid": paid,
            "outstanding": outstanding
        }
    }

@app.post("/api/payments/{order_id}")
def create_payment(order_id: int, p: PaymentCreateSchema):
    con = get_conn()
    cur = con.cursor()
    try:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cur.execute("INSERT INTO payments(order_id, pay_date, amount, type, method) VALUES(?,?,?,?,?)",
                    (order_id, now, p.amount, p.type, p.method))
        con.commit()
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        con.close()
    return {"status": "success"}

@app.get("/api/reports/summary")
def get_report_summary(from_date: str, to_date: str):
    con = get_conn()
    cur = con.cursor()
    cur.execute("SELECT id, shipping_fee, discount FROM orders WHERE date(order_date) >= date(?) AND date(order_date) <= date(?)", (from_date, to_date))
    orders = cur.fetchall()
    
    total_orders = len(orders)
    sum_items = sum_ship = sum_disc = sum_total = sum_paid = sum_due = total_profit = 0
    
    for row in orders:
        oid, ship, disc = row['id'], row['shipping_fee'] or 0, row['discount'] or 0
        cur.execute("SELECT product_name, unit_price, quantity FROM order_items WHERE order_id=?", (oid,))
        items = cur.fetchall()
        
        items_total = sum(i['unit_price'] * i['quantity'] for i in items)
        subtotal = max(0, items_total + ship - disc)
        
        cur.execute("SELECT COALESCE(SUM(amount),0) FROM payments WHERE order_id=?", (oid,))
        paid = cur.fetchone()[0] or 0
        due = subtotal - paid
        
        # profit calc
        for i in items:
            name_lower = i['product_name'].lower()
            profit_per_unit = 20000 if re.search(r'\b(2|3)\s*trứng\b', name_lower) else 80000
            total_profit += profit_per_unit * i['quantity']
            
        sum_items += items_total
        sum_ship += ship
        sum_disc += disc
        sum_total += subtotal
        sum_paid += paid
        sum_due += max(0, due)
        
    con.close()
    
    final_profit = max(0, total_profit - sum_disc)
    
    return {
        "total_orders": total_orders,
        "sum_items": sum_items,
        "sum_ship": sum_ship,
        "sum_disc": sum_disc,
        "sum_total": sum_total,
        "sum_paid": sum_paid,
        "sum_due": sum_due,
        "total_profit_raw": total_profit,
        "final_profit": final_profit
    }

@app.get("/api/reports/daily_products/{date_iso}")
def get_daily_products(date_iso: str):
    rows = _calc_daily_rows(date_iso)
    results = []
    total_cakes = 0
    total_boxes = 0
    for row in rows:
        name = row['product_name']
        q = int(row['qty'] or 0)
        from pdf_services import _boxes_for_product
        boxes = _boxes_for_product(name, q)
        total_cakes += q
        total_boxes += boxes
        results.append({
            "name": name,
            "quantity": q,
            "boxes": boxes
        })
    return {"items": results, "total_cakes": total_cakes, "total_boxes": total_boxes}

@app.post("/api/posts")
def create_post(post: PostCreateSchema):
    con = get_conn()
    cur = con.cursor()
    try:
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        cur.execute("""
            INSERT INTO posts(title, slug, excerpt, content, image_url, category, published, created_at)
            VALUES(?,?,?,?,?,?,?,?)
        """, (post.title, post.slug, post.excerpt, post.content, post.image_url, post.category, post.published, now))
        con.commit()
        return {"status": "success", "id": cur.lastrowid}
    except sqlite3.IntegrityError:
        con.rollback()
        raise HTTPException(status_code=400, detail="Slug đã tồn tại (hoặc lỗi dữ liệu)")
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        con.close()

@app.put("/api/posts/{post_id}")
def update_post(post_id: int, p: PostCreateSchema):
    con = get_conn()
    cur = con.cursor()
    try:
        cur.execute("""
            UPDATE posts SET title=?, slug=?, excerpt=?, content=?, image_url=?, category=?, published=?
            WHERE id=?
        """, (p.title, p.slug, p.excerpt, p.content, p.image_url, p.category, 1 if p.published else 0, post_id))
        con.commit()
    except sqlite3.IntegrityError:
        con.rollback()
        raise HTTPException(status_code=400, detail="Slug đã tồn tại (hoặc lỗi dữ liệu)")
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        con.close()
    return {"status": "success"}

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Resize if width > 1920 to save space
        if image.width > 1920:
            ratio = 1920 / image.width
            new_height = int(image.height * ratio)
            image = image.resize((1920, new_height), Image.Resampling.LANCZOS)
        
        # Convert to RGB if it has alpha channel to save as JPEG/WebP
        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')
            
        filename = f"{uuid.uuid4().hex}.webp"
        
        # Ensure public/uploads exists
        upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        
        filepath = os.path.join(upload_dir, filename)
        
        image.save(filepath, format="WEBP", quality=80)
        
        return {"url": f"/api/uploads/{filename}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Lỗi tải ảnh: {str(e)}")

@app.get("/api/posts")
def get_posts(published_only: bool = False):
    con = get_conn()
    cur = con.cursor()
    if published_only:
        cur.execute("SELECT * FROM posts WHERE published = 1 ORDER BY id DESC")
    else:
        cur.execute("SELECT * FROM posts ORDER BY id DESC")
    rows = cur.fetchall()
    con.close()
    return [dict(r) for r in rows]

@app.get("/api/posts/{slug}")
def get_post(slug: str):
    con = get_conn()
    cur = con.cursor()
    cur.execute("SELECT * FROM posts WHERE slug=?", (slug,))
    row = cur.fetchone()
    con.close()
    if not row:
        raise HTTPException(status_code=404, detail="Bài viết không tồn tại")
    return dict(row)

@app.delete("/api/posts/{post_id}")
def delete_post(post_id: int):
    con = get_conn()
    cur = con.cursor()
    try:
        cur.execute("DELETE FROM posts WHERE id=?", (post_id,))
        con.commit()
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        con.close()
    return {"status": "success"}

@app.get("/api/pdf/order/{order_id}")
def get_order_pdf(order_id: int):
    buf = generate_order_pdf_bytes(order_id)
    if not buf:
        raise HTTPException(status_code=404, detail="Order not found")
    
    return StreamingResponse(
        buf, 
        media_type="application/pdf", 
        headers={"Content-Disposition": f"inline; filename=order_{order_id}.pdf"}
    )

@app.get("/api/pdf/daily/{date_iso}")
def get_daily_pdf(date_iso: str):
    buf = generate_daily_report_pdf(date_iso)
    if not buf:
        raise HTTPException(status_code=404, detail="No orders found for date")
    return StreamingResponse(buf, media_type="application/pdf", headers={"Content-Disposition": f"inline; filename=daily_{date_iso}.pdf"})

@app.get("/api/pdf/merge/{date_iso}")
def get_merged_pdf(date_iso: str):
    con = get_conn()
    cur = con.cursor()
    cur.execute("SELECT id FROM orders WHERE date(receive_date) = date(?) ORDER BY id", (date_iso,))
    ids = [r[0] for r in cur.fetchall()]
    con.close()
    
    if not ids:
        raise HTTPException(status_code=404, detail="No orders found for this date")
        
    pdf_paths = []
    temp_dir = tempfile.mkdtemp(prefix="orders_tmp_")
    try:
        from pdf_services import _print_order_to_file
        for oid in ids:
            tmp_path = os.path.join(temp_dir, f"order_{oid}.pdf")
            if _print_order_to_file(oid, tmp_path):
                pdf_paths.append(tmp_path)
                
        merged_buf = merge_pdfs(pdf_paths)
        if not merged_buf:
             raise HTTPException(status_code=500, detail="Merge failed")
        
        return StreamingResponse(merged_buf, media_type="application/pdf", headers={"Content-Disposition": f"inline; filename=merged_{date_iso}.pdf"})
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)

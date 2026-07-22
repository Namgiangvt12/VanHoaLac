import os
import sys
import sqlite3
import firebase_admin
from firebase_admin import credentials, firestore

# Set stdout encoding to UTF-8 for Windows console support
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def migrate():
    db_path = os.path.join(os.path.dirname(__file__), "..", "data.db")
    if not os.path.exists(db_path):
        print("Khong tim thay data.db de migrate.")
        return

    cred_path = os.getenv("FIREBASE_CREDENTIALS", os.path.join(os.path.dirname(__file__), "..", "backend", "serviceAccountKey.json"))
    if not os.path.exists(cred_path):
        print(f"Chua co file {cred_path}. Vui long tai Service Account Key tu Firebase Console.")
        return

    cred = credentials.Certificate(cred_path)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    con = sqlite3.connect(db_path)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    # 1. Migrate Customers
    cur.execute("SELECT * FROM customers")
    customers = [dict(c) for c in cur.fetchall()]
    for c in customers:
        db.collection("customers").document(str(c['id'])).set({
            "name": c.get('name', ''),
            "phone": c.get('phone', ''),
            "address": c.get('address', '')
        })
    print(f"[OK] Da chuyen doi {len(customers)} khach hang.")

    # 2. Migrate Posts
    cur.execute("SELECT * FROM posts")
    posts = [dict(p) for p in cur.fetchall()]
    for p in posts:
        db.collection("posts").document(str(p['id'])).set({
            "title": p.get('title', ''),
            "slug": p.get('slug', ''),
            "excerpt": p.get('excerpt', ''),
            "content": p.get('content', ''),
            "image_url": p.get('image_url', ''),
            "category": p.get('category', ''),
            "published": bool(p.get('published', 0)),
            "created_at": p.get('created_at', '')
        })
    print(f"[OK] Da chuyen doi {len(posts)} bai viet.")

    # 3. Migrate Orders (with items & payments embedded)
    cur.execute("SELECT o.*, c.name as customer_name, c.phone as customer_phone FROM orders o JOIN customers c ON o.customer_id=c.id")
    orders = [dict(o) for o in cur.fetchall()]
    for o in orders:
        oid = o['id']
        cur.execute("SELECT product_name, unit_price, quantity FROM order_items WHERE order_id=?", (oid,))
        items = [dict(row) for row in cur.fetchall()]

        cur.execute("SELECT pay_date, amount, type, method FROM payments WHERE order_id=?", (oid,))
        payments = [dict(row) for row in cur.fetchall()]

        db.collection("orders").document(str(oid)).set({
            "customer_id": o.get('customer_id'),
            "customer_name": o.get('customer_name', ''),
            "customer_phone": o.get('customer_phone', ''),
            "order_date": o.get('order_date', ''),
            "receive_date": o.get('receive_date', ''),
            "discount": o.get('discount', 0),
            "shipping_fee": o.get('shipping_fee', 0),
            "notes": o.get('notes', ''),
            "items": items,
            "payments": payments
        })
    print(f"[OK] Da chuyen doi {len(orders)} don hang.")

    con.close()
    print("HOAN TAT CHUYEN DOI DU LIEU LEN FIREBASE FIRESTORE!")

if __name__ == "__main__":
    migrate()

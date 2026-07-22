import os
import io
from datetime import date
from decimal import Decimal, ROUND_HALF_UP
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from database import get_conn
from database_firebase import get_firestore_db

CURRENCY = "₫"


def money(v):
    try:
        n = int(Decimal(v).quantize(0, rounding=ROUND_HALF_UP))
    except Exception:
        try:
            n = int(float(v))
        except Exception:
            n = 0
    return f"{n:,}".replace(",", ".")

def _display_from_iso(iso_s: str) -> str:
    try:
        y, m, d = map(int, iso_s.split("-"))
        return f"{d:02d}/{m:02d}/{y:04d}"
    except Exception:
        return iso_s or ""

def get_vn_font():
    """Tự đăng ký font Unicode nếu có"""
    try:
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        candidates = [
            os.path.join(backend_dir, "DejaVuSans.ttf"),
            os.path.join(backend_dir, "fonts", "DejaVuSans.ttf"),
            os.path.join(backend_dir, "DejaVuSansCondensed.ttf"),
            os.path.join(backend_dir, "fonts", "DejaVuSansCondensed.ttf"),
            os.path.join(backend_dir, "LiberationSans-Regular.ttf"),
            os.path.join(backend_dir, "fonts", "LiberationSans-Regular.ttf"),
            os.path.join(backend_dir, "Arial.ttf"),
            os.path.join(backend_dir, "fonts", "Arial.ttf"),
        ]
        for fp in candidates:
            if os.path.isfile(fp):
                try:
                    pdfmetrics.registerFont(TTFont("VNFont", fp))
                    return "VNFont"
                except Exception:
                    continue
    except Exception:
        pass
    return "Helvetica"

def generate_order_pdf_bytes(order_id: int):
    try:
        db = get_firestore_db()
        if db:
            doc = db.collection("orders").document(str(order_id)).get()
            if doc.exists:
                data = doc.to_dict()
                order_date = data.get("order_date", "")
                receive_date = data.get("receive_date", "")
                shipping_fee = data.get("shipping_fee", 0) or 0
                discount = data.get("discount", 0) or 0
                notes = data.get("notes", "")
                cname = data.get("customer_name", "")
                cphone = data.get("customer_phone", "")
                caddr = data.get("customer_address", "")
                oid = order_id
                
                raw_items = data.get("items", [])
                items = [
                    {
                        'product_name': i.get('product_name') or i.get('name', ''),
                        'unit_price': i.get('unit_price') or i.get('price', 0),
                        'quantity': i.get('quantity', 1)
                    }
                    for i in raw_items
                ]
                
                tot_items = sum(i['unit_price'] * i['quantity'] for i in items)
                subtotal = max(0, tot_items + shipping_fee - discount)
                
                payments = data.get("payments", [])
                paid = sum(p.get("amount", 0) for p in payments)
                outstanding = subtotal - paid
                
                # Format to expected tuple structure
                data_tuple = (order_date, receive_date, shipping_fee, discount, notes, cname, cphone, caddr, oid)
                return _render_order_pdf_from_data(data_tuple, items, tot_items, subtotal, paid, outstanding)
    except Exception as fe:
        print(f"Firestore generate_order_pdf_bytes error: {fe}")

    con = get_conn()
    cur = con.cursor()
    cur.execute("""
        SELECT o.order_date, o.receive_date, o.shipping_fee, o.discount, o.notes,
               c.name, c.phone, c.address, o.id
        FROM orders o
        JOIN customers c ON o.customer_id=c.id
        WHERE o.id=?
    """, (order_id,))
    data = cur.fetchone()
    if not data:
        con.close()
        return None

    order_date, receive_date, shipping_fee, discount, notes, cname, cphone, caddr, oid = data
    cur.execute("SELECT product_name, unit_price, quantity FROM order_items WHERE order_id=?", (order_id,))
    items = cur.fetchall()
    
    tot_items = sum(i['unit_price'] * i['quantity'] for i in items)
    subtotal = max(0, tot_items + (shipping_fee or 0) - (discount or 0))
    cur.execute("SELECT COALESCE(SUM(amount),0) FROM payments WHERE order_id=?", (order_id,))
    paid = cur.fetchone()[0] or 0
    outstanding = subtotal - paid
    con.close()
    
    return _render_order_pdf_from_data(data, items, tot_items, subtotal, paid, outstanding)

def _render_order_pdf_from_data(data, items, tot_items, subtotal, paid, outstanding):
    order_date, receive_date, shipping_fee, discount, notes, cname, cphone, caddr, oid = data
    summary = {
        "total_items": tot_items,
        "discount": discount,
        "subtotal": subtotal,
        "paid": paid,
        "outstanding": outstanding
    }


    W = 72 * mm
    margin_x = 6 * mm
    margin_y = 6 * mm
    line_gap = 4.2 * mm
    hr_gap = 3.5 * mm
    title_fs = 12
    body_fs = 9
    total_fs = 9
    note_fs = 8
    col_amt_w = 24 * mm
    col_qty_w = 14 * mm
    col_name_w = W - 2*margin_x - col_qty_w - col_amt_w - 2*mm

    def string_width(txt, fs):
        return pdfmetrics.stringWidth(txt, get_vn_font(), fs)

    def wrap_text(text, fs, max_width):
        words = (text or "").split()
        lines, cur_line = [], ""
        for w in words:
            test = (cur_line + " " + w).strip()
            if string_width(test, fs) <= max_width:
                cur_line = test
            else:
                if cur_line: lines.append(cur_line)
                cur_line = w
        if cur_line: lines.append(cur_line)
        if not lines:
            s = text or ""
            cur_line = ""
            for ch in s:
                test = cur_line + ch
                if string_width(test, fs) <= max_width:
                    cur_line = test
                else:
                    if cur_line: lines.append(cur_line)
                    cur_line = ch
            if cur_line: lines.append(cur_line)
        return lines

    addr_lines = wrap_text(f"Đ/c: {caddr}", body_fs, W - 2*margin_x) if caddr else []
    header_fixed_lines = 4
    est_header_h = margin_y + (title_fs*1.2) + hr_gap + (header_fixed_lines + len(addr_lines)) * (body_fs*1.6)

    rows_h = 0
    for i in items:
        nlines = max(len(wrap_text(i['product_name'], body_fs, col_name_w)), 1)
        rows_h += nlines * line_gap
    est_totals_h = hr_gap + 6 * line_gap + hr_gap
    est_note_h = (0 if not notes else hr_gap + 2 * line_gap)
    est_base = margin_y + est_header_h + hr_gap + rows_h + est_totals_h + est_note_h + margin_y
    page_height_mm = max(80 * mm, est_base) / mm

    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(W, page_height_mm * mm))
    y = page_height_mm * mm - margin_y

    # Header
    c.setFont(get_vn_font(), title_fs)
    c.drawCentredString(W / 2, y, "HOÁ ĐƠN / ĐƠN HÀNG")
    y -= hr_gap

    c.setFont(get_vn_font(), body_fs)
    c.drawString(margin_x, y, f"Mã đơn: #{order_id}")
    c.drawRightString(W - margin_x, y, f"Ngày đặt: {_display_from_iso(order_date.split(' ')[0]) if order_date else ''}")
    y -= line_gap
    c.drawRightString(W - margin_x, y, f"Ngày nhận: {_display_from_iso(receive_date) if receive_date else ''}")
    y -= line_gap
    c.drawString(margin_x, y, f"Khách: {cname}")
    y -= line_gap
    if cphone:
        c.drawString(margin_x, y, f"SĐT: {cphone}")
        y -= line_gap
    if caddr:
        for line in addr_lines:
            c.drawString(margin_x, y, line)
            y -= line_gap

    c.setStrokeColor(colors.black)
    c.line(margin_x, y, W - margin_x, y)
    y -= hr_gap

    x_name = margin_x
    x_qty = W - margin_x - col_amt_w - 2*mm - col_qty_w
    x_amt = W - margin_x
    c.drawString(x_name, y, "Sản phẩm")
    c.drawRightString(x_qty + col_qty_w, y, "SL")
    c.drawRightString(x_amt, y, "Thành tiền")
    y -= hr_gap
    c.line(margin_x, y, W - margin_x, y)
    y -= hr_gap

    # Items
    for i in items:
        name, unit, qty = i['product_name'], i['unit_price'], i['quantity']
        wrapped = wrap_text(name, body_fs, col_name_w) or [name]
        for idx, line in enumerate(wrapped):
            if y < (margin_y + 8 * line_gap):
                c.showPage()
                y = page_height_mm * mm - margin_y
                c.setFont(get_vn_font(), body_fs)
            c.drawString(x_name, y, line)
            if idx == 0:
                c.drawRightString(x_qty + col_qty_w, y, str(qty))
                c.drawRightString(x_amt, y, f"{money(unit * qty)} {CURRENCY}")
            y -= line_gap

    y -= hr_gap / 2
    c.line(margin_x, y, W - margin_x, y)
    y -= hr_gap

    c.setFont(get_vn_font(), total_fs)
    c.drawRightString(x_amt, y, f"Tổng hàng: {money(summary['total_items'])} {CURRENCY}")
    y -= line_gap
    c.drawRightString(x_amt, y, f"Chiết khấu: {money(summary['discount'])} {CURRENCY}")
    y -= line_gap
    c.drawRightString(x_amt, y, f"Tổng đơn: {money(summary['subtotal'])} {CURRENCY}")
    y -= line_gap
    c.drawRightString(x_amt, y, f"Đã trả: {money(summary['paid'])} {CURRENCY}")
    y -= line_gap
    c.drawRightString(x_amt, y, f"Còn thiếu: {money(max(0, summary['outstanding']))} {CURRENCY}")
    y -= line_gap
    c.drawRightString(x_amt, y, f"L/h: 0971.682.213 / 0902.371.025")
    y -= line_gap
    if notes:
        y -= hr_gap / 2
        c.setFont(get_vn_font(), 8)
        
        def _wrap_full(text, fs, maxw):
            wfunc = lambda t: pdfmetrics.stringWidth(t, get_vn_font(), fs)
            words = (text or "").split()
            lines, cur = [], ""
            for w in words:
                test = (cur + " " + w).strip()
                if wfunc(test) <= maxw:
                    cur = test
                else:
                    if cur: lines.append(cur)
                    cur = w
            if cur: lines.append(cur)
            return lines

        for line in _wrap_full(f"Ghi chú: {notes} .", 8, W - 2*margin_x):
            if y < (margin_y + 4 * line_gap):
                c.showPage()
                y = page_height_mm * mm - margin_y
                c.setFont(get_vn_font(), 8)
            c.drawString(margin_x, y, line)
            y -= line_gap

    c.showPage()
    c.save()
    buf.seek(0)
    return buf

def _boxes_for_product(product_name: str, qty: int) -> int:
    import re
    from math import ceil
    if qty <= 0: return 0
    name = (product_name or "").strip()
    if re.search(r'\b(2|3)\s*trứng\b', name, flags=re.IGNORECASE) or re.fullmatch(r'(Da Dợp Chay|Trung Thu Nướng Chay)', name, flags=re.IGNORECASE):
        return ceil(qty / 4)
    return qty

def _calc_daily_rows(day_iso):
    try:
        db = get_firestore_db()
        if db:
            docs = list(db.collection("orders").stream())
            if docs:
                product_counts = {}
                for doc in docs:
                    d = doc.to_dict()
                    rdate_raw = str(d.get("receive_date", ""))
                    rdate = rdate_raw.split(" ")[0] if " " in rdate_raw else rdate_raw
                    if rdate == day_iso or rdate_raw.startswith(day_iso):
                        items = d.get("items", [])
                        for i in items:
                            pname = i.get("product_name") or i.get("name") or "Khác"
                            qty = int(i.get("quantity") or 1)
                            product_counts[pname] = product_counts.get(pname, 0) + qty
                            
                if product_counts:
                    return [
                        {"product_name": k, "qty": v}
                        for k, v in sorted(product_counts.items())
                    ]
    except Exception as fe:
        print(f"Firestore _calc_daily_rows error: {fe}")

    con = get_conn()
    cur = con.cursor()
    cur.execute("""
        SELECT oi.product_name, SUM(oi.quantity) as qty
        FROM orders o JOIN order_items oi ON oi.order_id = o.id
        WHERE date(o.receive_date) = date(?)
        GROUP BY oi.product_name ORDER BY oi.product_name
    """, (day_iso,))
    rows = [dict(r) for r in cur.fetchall()]
    con.close()
    return rows


def generate_daily_report_pdf(day_iso: str):
    rows = _calc_daily_rows(day_iso)
    if not rows: return None

    W = 72 * mm; margin_x = 6 * mm; margin_y = 6 * mm
    line_gap = 4.2 * mm; hr_gap = 3.5 * mm; title_fs = 12; body_fs = 9
    n_lines = 2 + len(rows) + 2
    page_height_mm = max(80, (margin_y/mm) * 2 + n_lines * (line_gap/mm) + 10)

    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(W, page_height_mm * mm))
    y = page_height_mm * mm - margin_y
    c.setFont(get_vn_font(), title_fs)
    c.drawCentredString(W/2, y, "BÁO CÁO NGÀY NHẬN")
    y -= hr_gap
    c.setFont(get_vn_font(), body_fs)
    c.drawCentredString(W/2, y, f"Ngày nhận: {_display_from_iso(day_iso)}")
    y -= hr_gap
    c.line(margin_x, y, W - margin_x, y)
    y -= hr_gap
    c.drawString(margin_x, y, "Sản phẩm")
    c.drawRightString(W - margin_x, y, "Bánh | Hộp")
    y -= hr_gap
    c.line(margin_x, y, W - margin_x, y)
    y -= hr_gap

    total_cakes = 0; total_boxes = 0
    for row in rows:
        name = row['product_name']
        q = int(row['qty'] or 0)
        boxes = _boxes_for_product(name, q)
        total_cakes += q; total_boxes += boxes
        c.drawString(margin_x, y, str(name))
        c.drawRightString(W - margin_x, y, f"{q} | {boxes}")
        y -= line_gap

    c.line(margin_x, y, W - margin_x, y); y -= hr_gap
    c.setFont(get_vn_font(), 10)
    c.drawRightString(W - margin_x, y, f"Tổng bánh: {total_cakes}   Tổng hộp: {total_boxes}")
    c.showPage(); c.save()
    buf.seek(0)
    return buf

def _print_order_to_file(order_id, out_path):
    buf = generate_order_pdf_bytes(order_id)
    if not buf: return False
    with open(out_path, "wb") as f:
        f.write(buf.read())
    return True

def merge_pdfs(pdf_paths):
    try:
        from PyPDF2 import PdfMerger
    except ImportError:
        try:
            from pypdf import PdfMerger
        except ImportError:
            return None
            
    merger = PdfMerger()
    for p in pdf_paths:
        try:
            merger.append(p)
        except Exception:
            pass
            
    buf = io.BytesIO()
    merger.write(buf)
    merger.close()
    buf.seek(0)
    return buf

import os
import sys
import sqlite3
from pymongo import MongoClient

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DEFAULT_MONGO_URI = "mongodb+srv://vanhoalac:H3hJLDZ7rCJCGmWR@cluster0.rvbtwpe.mongodb.net/mooncake_db?retryWrites=true&w=majority&appName=Cluster0"

def import_sqlite_to_mongodb():
    db_path = os.path.join(os.path.dirname(__file__), "..", "data.db")
    if not os.path.exists(db_path):
        print("Không tìm thấy file data.db")
        return

    print("Đang kết nối tới MongoDB Atlas...")
    uri = os.getenv("MONGODB_URI", DEFAULT_MONGO_URI)
    client = MongoClient(uri)
    db = client.get_database("mooncake_db")

    con = sqlite3.connect(db_path)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    # 1. Customers
    cur.execute("SELECT * FROM customers")
    customers = [dict(c) for c in cur.fetchall()]
    print(f"-> Tìm thấy {len(customers)} khách hàng trong data.db")
    if customers:
        db.customers.delete_many({})
        for c in customers:
            c['_id'] = str(c['id'])
            db.customers.replace_one({'_id': c['_id']}, c, upsert=True)
        print(f"✅ Đã import {len(customers)} khách hàng vào MongoDB Atlas!")

    # 2. Posts
    cur.execute("SELECT * FROM posts")
    posts = [dict(p) for p in cur.fetchall()]
    print(f"-> Tìm thấy {len(posts)} bài viết trong data.db")
    if posts:
        db.posts.delete_many({})
        for p in posts:
            p['_id'] = str(p['id'])
            p['published'] = bool(p.get('published', 0))
            db.posts.replace_one({'_id': p['_id']}, p, upsert=True)
        print(f"✅ Đã import {len(posts)} bài viết vào MongoDB Atlas!")

    # 3. Orders
    cur.execute("""
        SELECT o.id, o.customer_id, o.order_date, o.receive_date, o.discount, o.shipping_fee, o.notes,
               c.name as customer_name, c.phone as customer_phone, c.address as customer_address
        FROM orders o
        LEFT JOIN customers c ON o.customer_id = c.id
    """)
    orders = [dict(row) for row in cur.fetchall()]
    print(f"-> Tìm thấy {len(orders)} đơn hàng trong data.db")

    if orders:
        db.orders.delete_many({})
        for o in orders:
            oid = o['id']
            cur.execute("SELECT product_name, unit_price, quantity FROM order_items WHERE order_id=?", (oid,))
            items = [dict(row) for row in cur.fetchall()]

            cur.execute("SELECT pay_date, amount, type, method FROM payments WHERE order_id=?", (oid,))
            payments = [dict(row) for row in cur.fetchall()]

            doc = {
                "_id": str(oid),
                "id": oid,
                "customer_id": o.get('customer_id'),
                "customer_name": o.get('customer_name', ''),
                "customer_phone": o.get('customer_phone', ''),
                "customer_address": o.get('customer_address', ''),
                "order_date": o.get('order_date', ''),
                "receive_date": o.get('receive_date', ''),
                "discount": o.get('discount', 0) or 0,
                "shipping_fee": o.get('shipping_fee', 0) or 0,
                "notes": o.get('notes', ''),
                "items": items,
                "payments": payments
            }
            db.orders.replace_one({'_id': doc['_id']}, doc, upsert=True)
        print(f"✅ Đã import {len(orders)} đơn hàng vào MongoDB Atlas!")

    con.close()
    print("🎉 TẤT CẢ DỮ LIỆU TỪ DATA.DB ĐÃ ĐƯỢC IMPORT LÊN MONGODB ATLAS THÀNH CÔNG!")

if __name__ == "__main__":
    import_sqlite_to_mongodb()

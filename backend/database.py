import os
import sqlite3

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data.db")
# Dùng data.db ở thư mục gốc (mooncake-website/data.db)

def get_conn():
    con = sqlite3.connect(DB_PATH, check_same_thread=False)
    con.row_factory = sqlite3.Row # Để lấy dict dễ dàng
    con.execute("PRAGMA foreign_keys = ON")
    return con

def init_db():
    con = get_conn()
    cur = con.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS customers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        address TEXT
    )""")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS orders(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        order_date TEXT NOT NULL,
        receive_date TEXT,
        discount INTEGER DEFAULT 0,
        shipping_fee INTEGER DEFAULT 0,
        notes TEXT,
        FOREIGN KEY(customer_id) REFERENCES customers(id)
    )""")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS order_items(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_name TEXT NOT NULL,
        unit_price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY(order_id) REFERENCES orders(id)
    )""")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS payments(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        pay_date TEXT NOT NULL,
        amount INTEGER NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('deposit','full','shipping','other')),
        method TEXT,
        FOREIGN KEY(order_id) REFERENCES orders(id)
    )""")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT,
        content TEXT NOT NULL,
        image_url TEXT,
        category TEXT,
        published BOOLEAN DEFAULT 0,
        created_at TEXT NOT NULL
    )""")
    con.commit()
    con.close()

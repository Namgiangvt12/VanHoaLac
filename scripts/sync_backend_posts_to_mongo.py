import os
import sys
import sqlite3
from pymongo import MongoClient

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DEFAULT_MONGO_URI = "mongodb+srv://vanhoalac:H3hJLDZ7rCJCGmWR@cluster0.rvbtwpe.mongodb.net/mooncake_db?retryWrites=true&w=majority&appName=Cluster0"

def sync_backend_posts():
    db_path = os.path.join(os.path.dirname(__file__), "..", "backend", "data.db")
    if not os.path.exists(db_path):
        db_path = os.path.join(os.path.dirname(__file__), "..", "data.db")

    print(f"Đọc dữ liệu từ file: {db_path}")
    if not os.path.exists(db_path):
        print("Không tìm thấy file data.db")
        return

    uri = os.getenv("MONGODB_URI", DEFAULT_MONGO_URI)
    print("Đang kết nối tới MongoDB Atlas...")
    client = MongoClient(uri)
    db = client.get_database("mooncake_db")

    # 1. Xóa toàn bộ post cũ trên MongoDB Atlas
    deleted_res = db.posts.delete_many({})
    print(f"🗑️ Đã xóa {deleted_res.deleted_count} bài viết cũ trên MongoDB Atlas.")

    # 2. Đọc bài viết từ data.db
    con = sqlite3.connect(db_path)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute("SELECT * FROM posts")
    posts = [dict(p) for p in cur.fetchall()]
    print(f"Tìm thấy {len(posts)} bài viết mới trong {db_path}:")

    for p in posts:
        pid = str(p['id'])
        doc_data = {
            "_id": pid,
            "id": p['id'],
            "title": p.get('title', ''),
            "slug": p.get('slug', ''),
            "excerpt": p.get('excerpt', ''),
            "content": p.get('content', ''),
            "image_url": p.get('image_url', ''),
            "category": p.get('category', ''),
            "published": bool(p.get('published', 0)),
            "created_at": p.get('created_at', '')
        }
        db.posts.replace_one({'_id': pid}, doc_data, upsert=True)
        print(f" -> ✅ Đã import bài viết ID {pid}: '{p.get('title')}' (Slug: {p.get('slug')})")

    con.close()
    print("🎉 HOÀN TẤT ĐỒNG BỘ VÀ LÀM MỚI TẤT CẢ BÀI VIẾT LÊN MONGODB ATLAS!")

if __name__ == "__main__":
    sync_backend_posts()

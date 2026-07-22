import os
import sys
import sqlite3
import firebase_admin
from firebase_admin import credentials, firestore

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def sync_posts():
    db_path = os.path.join(os.path.dirname(__file__), "..", "data.db")
    if not os.path.exists(db_path):
        print("Không tìm thấy data.db")
        return

    cred_path = os.getenv("FIREBASE_CREDENTIALS", os.path.join(os.path.dirname(__file__), "..", "backend", "serviceAccountKey.json"))
    if not os.path.exists(cred_path):
        print(f"Chưa có file {cred_path}")
        return

    cred = credentials.Certificate(cred_path)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    
    db = firestore.client()
    con = sqlite3.connect(db_path)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute("SELECT * FROM posts")
    posts = [dict(p) for p in cur.fetchall()]
    print(f"Tìm thấy {len(posts)} bài viết trong data.db:")

    for p in posts:
        pid = str(p['id'])
        doc_data = {
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
        db.collection("posts").document(pid).set(doc_data)
        print(f" -> Đã đẩy bài viết ID {pid}: '{p.get('title')}' (Slug: {p.get('slug')})")

    con.close()
    print("🎉 Hoàn tất đồng bộ bài viết lên Firestore!")

if __name__ == "__main__":
    sync_posts()

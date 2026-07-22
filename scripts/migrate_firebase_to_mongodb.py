import os
import sys
import firebase_admin
from firebase_admin import credentials, firestore
from pymongo import MongoClient

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

DEFAULT_MONGO_URI = "mongodb+srv://vanhoalac:H3hJLDZ7rCJCGmWR@cluster0.rvbtwpe.mongodb.net/mooncake_db?retryWrites=true&w=majority&appName=Cluster0"

def migrate_firebase_to_mongo():
    cred_path = os.getenv("FIREBASE_CREDENTIALS", os.path.join(os.path.dirname(__file__), "..", "backend", "serviceAccountKey.json"))
    if not os.path.exists(cred_path):
        print(f"Chua co file {cred_path}")
        return

    print("Ket noi den Firebase...")
    cred = credentials.Certificate(cred_path)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    fb_db = firestore.client()

    print("Ket noi den MongoDB Atlas...")
    uri = os.getenv("MONGODB_URI", DEFAULT_MONGO_URI)
    mongo_client = MongoClient(uri)
    mongo_db = mongo_client.get_database("mooncake_db")

    # 1. Orders
    fb_orders = list(fb_db.collection("orders").stream())
    print(f"Tim thấy {len(fb_orders)} don hang tren Firebase...")
    if fb_orders:
        for doc in fb_orders:
            data = doc.to_dict()
            oid = str(doc.id)
            data["_id"] = oid
            data["id"] = int(oid) if oid.isdigit() else oid
            mongo_db.orders.replace_one({"_id": oid}, data, upsert=True)
        print(f"[OK] Da chuyen doi {len(fb_orders)} don hang tu Firebase sang MongoDB Atlas.")

    # 2. Customers
    fb_custs = list(fb_db.collection("customers").stream())
    print(f"Tim thấy {len(fb_custs)} khach hang tren Firebase...")
    if fb_custs:
        for doc in fb_custs:
            data = doc.to_dict()
            cid = str(doc.id)
            data["_id"] = cid
            data["id"] = int(cid) if cid.isdigit() else cid
            mongo_db.customers.replace_one({"_id": cid}, data, upsert=True)
        print(f"[OK] Da chuyen doi {len(fb_custs)} khach hang tu Firebase sang MongoDB Atlas.")

    # 3. Posts
    fb_posts = list(fb_db.collection("posts").stream())
    print(f"Tim thấy {len(fb_posts)} bai viet tren Firebase...")
    if fb_posts:
        for doc in fb_posts:
            data = doc.to_dict()
            pid = str(doc.id)
            data["_id"] = pid
            data["id"] = int(pid) if pid.isdigit() else pid
            mongo_db.posts.replace_one({"_id": pid}, data, upsert=True)
        print(f"[OK] Da chuyen doi {len(fb_posts)} bai viet tu Firebase sang MongoDB Atlas.")

    print("HOAN TAT CHUYEN DOI TOAN BO DU LIEU TU FIREBASE SANG MONGODB ATLAS!")

if __name__ == "__main__":
    migrate_firebase_to_mongo()

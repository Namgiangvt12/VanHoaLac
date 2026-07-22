import os
from dotenv import load_dotenv
from pymongo import MongoClient, ASCENDING, DESCENDING
import certifi

# Load .env files from both root and backend directory
env_local = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(env_local):
    load_dotenv(env_local)

env_backend = os.path.join(os.path.dirname(__file__), ".env.local")
if os.path.exists(env_backend):
    load_dotenv(env_backend)

load_dotenv()

mongo_client = None
db_mongo = None

DEFAULT_MONGO_URI = "mongodb+srv://vanhoalac:H3hJLDZ7rCJCGmWR@cluster0.rvbtwpe.mongodb.net/mooncake_db?retryWrites=true&w=majority&appName=Cluster0"

def _ensure_indexes(db):
    try:
        # Orders indexes for fast filtering and reporting
        db.orders.create_index([("receive_date", ASCENDING)])
        db.orders.create_index([("order_date", DESCENDING)])
        db.orders.create_index([("id", DESCENDING)])
        
        # Posts indexes for instant article loading
        db.posts.create_index([("slug", ASCENDING)], unique=True)
        db.posts.create_index([("published", ASCENDING)])
        db.posts.create_index([("id", DESCENDING)])

        # Customers indexes
        db.customers.create_index([("id", ASCENDING)])
        db.customers.create_index([("phone", ASCENDING)])
    except Exception as ie:
        print(f"MongoDB index setup notice: {ie}")

def get_mongo_db():
    global mongo_client, db_mongo
    if db_mongo is not None:
        return db_mongo

    uri = os.getenv("MONGODB_URI", DEFAULT_MONGO_URI)

    # Attempt 1: Standard TLS with certifi bundle (Linux compatible)
    try:
        mongo_client = MongoClient(uri, serverSelectionTimeoutMS=10000, tlsCAFile=certifi.where())
        mongo_client.admin.command('ping')
        db_mongo = mongo_client.get_database("mooncake_db")
        _ensure_indexes(db_mongo)
        print("MongoDB Atlas connected & indexed successfully!")
        return db_mongo
    except Exception as e1:
        print(f"MongoDB SSL standard connection attempt failed: {e1}")

    # Attempt 2: Fallback TLS setting for Linux VPS environments
    try:
        mongo_client = MongoClient(uri, serverSelectionTimeoutMS=10000, tls=True, tlsAllowInvalidCertificates=True)
        mongo_client.admin.command('ping')
        db_mongo = mongo_client.get_database("mooncake_db")
        _ensure_indexes(db_mongo)
        print("MongoDB Atlas connected via SSL fallback!")
        return db_mongo
    except Exception as e2:
        print(f"MongoDB Atlas connection error: {e2}")
        return None

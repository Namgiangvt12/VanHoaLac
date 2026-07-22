import os
from pymongo import MongoClient

mongo_client = None
db_mongo = None

DEFAULT_MONGO_URI = "mongodb+srv://vanhoalac:H3hJLDZ7rCJCGmWR@cluster0.rvbtwpe.mongodb.net/mooncake_db?retryWrites=true&w=majority&appName=Cluster0"

def get_mongo_db():
    global mongo_client, db_mongo
    if db_mongo is not None:
        return db_mongo

    uri = os.getenv("MONGODB_URI", DEFAULT_MONGO_URI)
    try:
        mongo_client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        # Verify connection
        mongo_client.admin.command('ping')
        
        # Get database name from URI or default to mooncake_db
        db_mongo = mongo_client.get_database("mooncake_db")
        print("🍃 MongoDB Atlas connected successfully!")
        return db_mongo
    except Exception as e:
        print(f"⚠️ MongoDB Atlas connection error: {e}")
        return None

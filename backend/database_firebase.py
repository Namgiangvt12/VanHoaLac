import os
import firebase_admin
from firebase_admin import credentials, firestore

db_firebase = None

def init_firebase():
    global db_firebase
    if firebase_admin._apps:
        db_firebase = firestore.client()
        return db_firebase

    cred_path = os.getenv("FIREBASE_CREDENTIALS", os.path.join(os.path.dirname(__file__), "serviceAccountKey.json"))
    
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        # Fallback for default initialization or demo mode
        try:
            cred = credentials.ApplicationDefault()
            firebase_admin.initialize_app(cred)
        except Exception:
            # If no credentials, initialize app with project ID if set
            project_id = os.getenv("FIREBASE_PROJECT_ID", "mooncake-app")
            firebase_admin.initialize_app(options={"projectId": project_id})

    db_firebase = firestore.client()
    return db_firebase

def get_firestore_db():
    global db_firebase
    if db_firebase is None:
        init_firebase()
    return db_firebase

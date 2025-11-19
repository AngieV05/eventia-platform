from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from pymongo import MongoClient
import os

app = FastAPI(title="AuthLogin Service")

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "eventia_db")
USERS_COLLECTION = os.getenv("USERS_COLLECTION", "users")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
db = client[DB_NAME]
users_col = db[USERS_COLLECTION]

class UserIn(BaseModel):
    username: str
    password: str

@app.post("/login")
async def login(user: UserIn):
    doc = users_col.find_one({"username": user.username})
    if not doc:
        raise HTTPException(status_code=404, detail="Usuario no registrado.")
    hashed = doc.get("password")
    if not pwd_context.verify(user.password, hashed):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta.")
    return {"message": f"Usuario '{user.username}' autenticado correctamente."}

# Optional admin endpoint to add user directly (only for dev)
@app.post("/add_user")
async def add_user(user: UserIn):
    hashed = pwd_context.hash(user.password)
    try:
        result = users_col.insert_one({"username": user.username, "password": hashed})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": f"Usuario '{user.username}' agregado a AuthLogin."}

@app.get("/users")
async def list_users():
    users = users_col.find({}, {"_id": 0, "username": 1})
    return {"usuarios": [u["username"] for u in users]}

@app.get("/health")
async def health():
    try:
        client.admin.command("ping")
        return {"status": "ok", "db": DB_NAME}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

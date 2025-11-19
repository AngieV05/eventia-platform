from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from pymongo import MongoClient, errors
import os
import requests

app = FastAPI(title="AuthRegistro Service")

# Configuración (puedes usar .env o variables de entorno)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "eventia_db")
USERS_COLLECTION = os.getenv("USERS_COLLECTION", "users")
AUTHLOGIN_URL = os.getenv("AUTHLOGIN_SERVICE_URL", "http://localhost:8001")  # opcional

# Hasher
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Conexión Mongo
client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
db = client[DB_NAME]
users_col = db[USERS_COLLECTION]

# Asegurar índice único en username
try:
    users_col.create_index("username", unique=True)
except errors.OperationFailure:
    pass

class UserIn(BaseModel):
    username: str
    password: str

@app.post("/register")
async def register(user: UserIn):
    hashed = pwd_context.hash(user.password)
    doc = {"username": user.username, "password": hashed}
    try:
        result = users_col.insert_one(doc)
    except errors.DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Usuario ya existe")
    # Opcional: sincronizar con AuthLogin si este usa otra DB (no necesario si comparten DB)
    # try:
    #     requests.post(f"{AUTHLOGIN_URL}/add_user", json={"username": user.username, "password": user.password}, timeout=5)
    # except requests.exceptions.RequestException:
    #     pass
    return {"message": f"Usuario '{user.username}' registrado correctamente", "id": str(result.inserted_id)}

@app.get("/users")
async def list_users():
    # Devuelve solo usernames (no contraseñas)
    users = users_col.find({}, {"_id": 0, "username": 1})
    return {"usuarios": [u["username"] for u in users]}

@app.get("/health")
async def health():
    try:
        # ping mongo
        client.admin.command("ping")
        return {"status": "ok", "db": DB_NAME}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

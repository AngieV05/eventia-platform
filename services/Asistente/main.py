from fastapi import FastAPI, APIRouter, HTTPException
import os

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Servicio Asistente funcionando en localhost:8005"}

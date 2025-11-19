from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Servicio Proveedor funcionando en localhost:8003"}

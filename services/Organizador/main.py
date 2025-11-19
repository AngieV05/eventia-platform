from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Servicio Organizador funcionando en localhost:8004"}

from fastapi import FastAPI

app = FastAPI(title="Eventia Platform API", version="1.0")

@app.get("/")
def root():
    return {"message": "Bienvenida a Eventia - Gestión de eventos corporativos"}

@app.get("/status")
def status():
    return {"status": "ok", "service": "backend funcionando correctamente"}

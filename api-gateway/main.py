# ~/eventia9/api-gateway/main.py
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import httpx
import os

app = FastAPI(title="API Gateway Eventia")

# Base URL de los microservicios
AUTH_LOGIN_URL = os.getenv("AUTH_LOGIN_URL", "http://localhost:8001")
AUTH_REGISTRO_URL = os.getenv("AUTH_REGISTRO_URL", "http://localhost:8002")
ASISTENTE_URL = os.getenv("ASISTENTE_URL", "http://localhost:8003")
PROVEEDOR_URL = os.getenv("PROVEEDOR_URL", "http://localhost:8004")
ORGANIZADOR_URL = os.getenv("ORGANIZADOR_URL", "http://localhost:8005")


# Middleware para manejar errores de microservicios
@app.middleware("http")
async def catch_errors(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except httpx.RequestError as e:
        return JSONResponse(
            status_code=500,
            content={"detail": f"Error connecting to service: {str(e)}"},
        )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"detail": f"Internal server error: {str(e)}"},
        )

# Health check del gateway
@app.get("/health")
async def health():
    return {"status": "ok", "services": ["auth-login", "auth-registro", "asistente", "proveedor", "organizador"]}


# Ruta para registro de usuarios (AuthRegistro)
@app.post("/api/v1/authregistro/register")
async def register_user(request: Request):
    payload = await request.json()
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{AUTH_REGISTRO_URL}/register", json=payload)
        return JSONResponse(status_code=resp.status_code, content=resp.json())

# Ruta para login de usuarios (AuthLogin)
@app.post("/api/v1/authlogin/login")
async def login_user(request: Request):
    payload = await request.json()
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{AUTH_LOGIN_URL}/login", json=payload)
        return JSONResponse(status_code=resp.status_code, content=resp.json())

# Rutas para Asistente
@app.get("/api/v1/asistente/{path:path}")
async def forward_asistente(path: str, request: Request):
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{ASISTENTE_URL}/{path}")
        return JSONResponse(status_code=resp.status_code, content=resp.json())

# Rutas para Proveedor
@app.get("/api/v1/proveedor/{path:path}")
async def forward_proveedor(path: str, request: Request):
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{PROVEEDOR_URL}/{path}")
        return JSONResponse(status_code=resp.status_code, content=resp.json())

# Rutas para Organizador
@app.get("/api/v1/organizador/{path:path}")
async def forward_organizador(path: str, request: Request):
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{ORGANIZADOR_URL}/{path}")
        return JSONResponse(status_code=resp.status_code, content=resp.json())






#from fastapi import FastAPI, APIRouter, Request, HTTPException
#from fastapi.middleware.cors import CORSMiddleware
#import requests
#import os

# Define la instancia de la aplicación FastAPI.
#app = FastAPI(title="API Gateway Taller Microservicios")

# Configura CORS (Cross-Origin Resource Sharing).
# Esto es esencial para permitir que el frontend se comunique con el gateway.
#app.add_middleware(
    #CORSMiddleware,
    #allow_origins=["*"],  # Permite peticiones desde cualquier origen (ajustar en producción)
    #allow_credentials=True,
    #allow_methods=["*"],
    #allow_headers=["*"],
#)

# Crea un enrutador para las peticiones de los microservicios.
#router = APIRouter(prefix="/api/v1")

# Define los microservicios y sus URLs.
# La URL debe coincidir con el nombre del servicio definido en docker-compose.yml.
# El puerto debe ser el del contenedor (ej. auth-service:8001).
#SERVICES = {
    #"auth": os.getenv("AUTH_SERVICE_URL", "http://auth-service:8001"),
    # TODO: Agrega los URLs de los otros microservicios de tu tema.
    # "service1_name": os.getenv("NAME1_SERVICE_URL", "http://service1-service:8002"),
    # "service2_name": os.getenv("NAME2_SERVICE_URL", "http://service2-service:8003"),
    # "service3_name": os.getenv("NAME3_SERVICE_URL", "http://service3-service:8004"),
#}

# TODO: Implementa una ruta genérica para redirigir peticiones GET.
#@router.get("/{service_name}/{path:path}")
#async def forward_get(service_name: str, path: str, request: Request):
    #if service_name not in SERVICES:
        #raise HTTPException(status_code=404, detail=f"Service '{service_name}' not found.")
    
    #service_url = f"{SERVICES[service_name]}/{path}"
    
    #try:
        #response = requests.get(service_url, params=request.query_params)
        #response.raise_for_status()
        #return response.json()
    #except requests.exceptions.RequestException as e:
        #raise HTTPException(status_code=500, detail=f"Error forwarding request to {service_name}: {e}")

# #TODO: Implementa una ruta genérica para redirigir peticiones POST.
#@router.post("/{service_name}/{path:path}")
#async def forward_post(service_name: str, path: str, request: Request):
    #if service_name not in SERVICES:
        #raise HTTPException(status_code=404, detail=f"Service '{service_name}' not found.")
    
    #service_url = f"{SERVICES[service_name]}/{path}"
    
    #try:
        # Pasa los datos JSON del cuerpo de la petición.
        #response = requests.post(service_url, json=await request.json())
        #response.raise_for_status()
        #return response.json()
    #except requests.exceptions.RequestException as e:
        #raise HTTPException(status_code=500, detail=f"Error forwarding request to {service_name}: {e}")

# TODO: Agrega más rutas para otros métodos HTTP (PUT, DELETE, etc.).

# Incluye el router en la aplicación principal.
#app.include_router(router)

# Endpoint de salud para verificar el estado del gateway.
#@app.get("/health")
#def health_check():
    #return {"status": "ok", "message": "API Gateway is running."}#

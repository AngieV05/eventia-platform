# 🟣 Eventia – Plataforma Integral de Gestión de Eventos Corporativos

**Corporación Universitaria Remington – Seminario de Ingeniería de Sistemas  
Desarrollo Moderno con Python (2025)**

---

## 🟣 Descripción del Proyecto

**Eventia** es una plataforma web modular diseñada para optimizar la planificación, organización y ejecución de eventos corporativos mediante herramientas digitales modernas.

Permite:

- 🔹 Centralizar procesos  
- 🔹 Mejorar trazabilidad  
- 🔹 Automatizar tareas  
- 🔹 Facilitar la interacción entre organizadores, proveedores y asistentes  

El proyecto utiliza **microservicios**, contenedores **Docker**, **API Gateway** y un **frontend en React**, con metodología **incremental**.

---

## 🟦 Funcionalidades Principales

- 🔐 Autenticación y roles (admin, organizador, proveedor, asistente)  
- 📅 Gestión de eventos corporativos  
- 🤝 Gestión de proveedores  
- 📝 Inscripciones y control de asistentes  
- 📊 Estadísticas e informes  
- 📦 Arquitectura por microservicios  
- 🚀 Orquestación completa con Docker Compose  
- 🌐 Frontend React conectado al API Gateway  

---

## 🏗️ Arquitectura del Sistema

### 🔧 Microservicios (FastAPI)

| Servicio                   | Función                             | Base de datos |
|----------------------------|------------------------------------|---------------|
| servicio de autenticación  | Autenticación · JWT · Roles         | MongoDB       |
| servicio de eventos        | Gestión de eventos                  | MongoDB       |
| proveedores-servicio       | Proveedores y logística             | MongoDB       |
| servicio de registro       | Inscripciones y asistentes          | MongoDB       |
| API Gateway                | Enrutamiento · CORS · Proxy central | —             |

### 🖥️ Infraestructura

- Docker y Docker Compose  
- Redes internas seguras  
- Volúmenes persistentes  
- Redis (cache/colas)  
- Aislamiento por microservicios  

---

## 📂 Estructura del Repositorio

📁 `eventia-platform/`  
├─ 📄 `README.md`  
├─ 📄 `_env.example`  
├─ 📁 `api-gateway/`  
│  ├─ `Dockerfile`  
│  ├─ `__pycache__/`  
│  ├─ `main.py`  
│  ├─ `requirements.txt`  
│  └─ `venv/`  
├─ 📄 `code.zip`  
├─ 📁 `common/`  
│  ├─ `config.py`  
│  └─ `helpers/`  
├─ 📄 `docker-compose.yml`  
├─ 📁 `frontend/`  
│  ├─ `Dockerfile`  
│  ├─ `app/`  
│  ├─ `app.py`  
│  ├─ `components/`  
│  ├─ `components.json`  
│  ├─ `hooks/`  
│  ├─ `lib/`  
│  ├─ `next-env.d.ts`  
│  ├─ `next.config.mjs`  
│  ├─ `node_modules/`  
│  ├─ `package.json`  
│  ├─ `pnpm-lock.yaml`  
│  ├─ `postcss.config.mjs`  
│  ├─ `public/`  
│  ├─ `requirements.txt`  
│  ├─ `styles/`  
│  └─ `tsconfig.json`  
├─ 📁 `mongo-data/`  
│  ├─ `WiredTiger*` (archivos de datos)  
│  ├─ `journal/`  
│  ├─ `mongod.lock`  
│  ├─ `sizeStorer.wt`  
│  └─ `storage.bson`  
├─ 📁 `services/`  
│  ├─ `Asistente/`  
│  ├─ `AuthLogin/`  
│  ├─ `AuthRegistro/`  
│  ├─ `Organizador/`  
│  └─ `Proveedor/`  
└─ 📁 `venv/`  
   ├─ `bin/`  
   ├─ `include/`  
   ├─ `lib/`  
   ├─ `lib64 -> lib`  
   └─ `pyvenv.cfg`  

> ⚠️ Nota: Carpeta `mongo-data/` contiene los datos de MongoDB, no modificar directamente.

---

## ⚙️ Requisitos Previos

- 🐳 Docker  
- 🐳 Docker Compose  
- 🐍 Python 3.10+ (para ejecutar servicios manualmente)  
- 🟦 Node.js 18+ (para correr frontend local)  

---

## 🚀 Cómo Ejecutar el Proyecto en Local

1️⃣ Clonar el repositorio:

```bash
git clone https://github.com/AngieV05/eventia-platform.git
cd eventia-platform
2️⃣ Construir y ejecutar todo el sistema:

bash
Copiar código
docker compose up --build
3️⃣ Acceder a los servicios:

Servicio	URL
Frontend	http://localhost:3000
API Gateway	http://localhost:8000
Auth Service Docs	http://localhost:8001/docs
Events Service Docs	http://localhost:8002/docs
Providers Service Docs	http://localhost:8003/docs
Registrations Service Docs	http://localhost:8004/docs

🧪 Endpoints Principales
Registro de usuario (Auth Service):
POST /auth/register

Login:
POST /auth/login

Todos los servicios cuentan con documentación Swagger en:
http://localhost:800X/docs

📘 Metodología de Desarrollo
Metodología incremental:
Desarrollo progresivo por módulos

Entregas funcionales por fases

Mayor adaptabilidad

Reducción de riesgos

Integración continua

Cada incremento incluye:

Requerimientos

Diseño

Desarrollo

Pruebas

Integración al ecosistema

📊 Resultados Esperados
Mejor trazabilidad de eventos

Reducción de tiempos operativos

Flujo de comunicación optimizado

Estadísticas en tiempo real

Plataforma moderna, escalable y modular

👩‍💻 Bitácora del Proyecto
Inicialización del repositorio
bash
Copiar código
gh auth login
gh repo create angievargas/eventia-platform --public --confirm
git init
git remote add origin https://github.com/AngieV05/eventia-platform.git
Ejecución del stack
bash
Copiar código
docker compose down -v --remove-orphans
docker compose up --build
🔧 Tecnologías Utilizadas
Backend
FastAPI

Python

Uvicorn

Pydantic v2

MongoDB / PostgreSQL

Redis

Frontend
React

Vite

TailwindCSS

Axios

Infraestructura
Docker

Docker Compose

Volúmenes persistentes

Redes virtuales

📚 Créditos Académicos
Rol	Nombre
Autora	Angie Gisell Vargas Solórzano
Tutor	Diego Fernando Marín
Programa	Ingeniería de Sistemas
Seminario	Desarrollo Moderno con Python – 2025

📝 Licencia
Este proyecto es de carácter académico.
Puede consultarse y reutilizarse bajo fines educativos.
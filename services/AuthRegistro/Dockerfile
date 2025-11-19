# Dockerfile para servicios FastAPI
FROM python:3.12-slim

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del servicio
COPY . /app

# Instalar dependencias
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir fastapi uvicorn pymongo python-dotenv

EXPOSE 8002

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]

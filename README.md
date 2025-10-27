# EventCorp - Plataforma de Gestión de Eventos Corporativos

Proyecto: Plataforma web modular para la gestión de eventos corporativos.  
Metodología: Desarrollo Incremental.  
Entorno: Ubuntu, Python (FastAPI), Docker, PostgreSQL, MongoDB, Redis.  
Repositorio: https://github.com/AngieV05/eventia-platform

## Estructura
- services/: microservicios (auth, events, providers, registrations)
- infra/: docker-compose.yml y scripts de infraestructura
- docs/: diagramas y evidencia

## Cómo ejecutar (desarrollador)
1. `docker compose up --build`
2. Auth: http://localhost:8001/docs

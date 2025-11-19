# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copia package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instala pnpm y dependencias
RUN npm install -g pnpm \
    && pnpm install

# Copia todo el código
COPY . .

# Expone el puerto que usa Next.js
EXPOSE 3000

# Comando para iniciar el frontend
CMD ["npm", "run", "dev"]
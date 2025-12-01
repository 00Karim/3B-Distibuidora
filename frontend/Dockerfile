FROM node:18

WORKDIR /app

# Instalar deps
COPY package*.json ./
RUN npm install

# Copiamos el resto del frontend
COPY . .

# Compilar build
RUN npm run build

# Servir build con un server estático
RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist"]
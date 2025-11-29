FROM node:18

WORKDIR /app

# Copiamos package.json primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos todo el backend
COPY . .

# El backend usa 3000 o 4000 normalmente. Ajustalo si hace falta.
EXPOSE 3000

CMD ["node", "index.js"]
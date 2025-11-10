FROM node:18-alpine

WORKDIR /app/auth-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]

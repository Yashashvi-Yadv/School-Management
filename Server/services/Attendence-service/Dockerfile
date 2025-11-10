FROM node:18-alpine

WORKDIR /app/attendance-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003

CMD ["node", "server.js"]

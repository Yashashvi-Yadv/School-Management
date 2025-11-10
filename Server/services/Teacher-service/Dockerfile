FROM node:18-alpine

WORKDIR /app/teacher-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["node", "server.js"]

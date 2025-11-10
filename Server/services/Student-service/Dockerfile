FROM node:18-alpine

WORKDIR /app/student-service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["node", "index.js"]

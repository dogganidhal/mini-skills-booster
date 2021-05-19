FROM node:14.15.3 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", "/app/dist/main.js"]

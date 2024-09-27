FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm i sharp@^0.33.2

COPY . .

RUN npm run build

CMD ["node", "dist/server.js"]
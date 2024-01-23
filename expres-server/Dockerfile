FROM node:18-alpine

COPY package*.json .
RUN npm ci 

COPY . .

CMD ["node","index.js"]
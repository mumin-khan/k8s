FROM node:12.22.12-alpine
COPY package*.json .
RUN npm ci 

COPY . .
CMD ["node","index.js"]
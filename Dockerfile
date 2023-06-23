FROM node:alpine

COPY package.json ./

COPY server.js ./

RUN npm install

EXPOSE 3000

CMD ["node","server.js"]
FROM node:latest-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn add

COPY . .

EXPOSE 9000

CMD ["node", "serer.js"]

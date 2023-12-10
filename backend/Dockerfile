FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run migration:prod:run

RUN npm run build

CMD [ "node", "dist/main.js" ]
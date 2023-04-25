From node:18.15.0-alpine3.17

RUN npm install -g npm@9.6.5

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 4200

CMD ["npm", "run", "start"]
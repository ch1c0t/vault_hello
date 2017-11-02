FROM node:8-alpine

RUN npm install pm2 -g
RUN npm i coffeescript -g

COPY . /app
RUN cd /app && npm i

WORKDIR /app

CMD ["pm2-docker", "index.js"]

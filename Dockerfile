FROM node:alpine

COPY ./dist /app
WORKDIR /app

RUN npm set strict-ssl false && npm i --production

EXPOSE 80
ENTRYPOINT [ "npm", "start:prod" ]

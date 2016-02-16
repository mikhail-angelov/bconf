FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json /usr/src/app/
RUN npm install --production

COPY ./dist /usr/src/app

EXPOSE 9000

CMD [ "npm", "start" ]

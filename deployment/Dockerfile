FROM node:argon

MAINTAINER Mikhail.Angelov (@MikhailAngelov)

RUN mkdir -p /opt/bconf
WORKDIR /opt/bconf

RUN npm install forever -g

COPY package.json /opt/bconf/package.json
RUN npm install --production

COPY ./dist /opt/bconf

EXPOSE 9000


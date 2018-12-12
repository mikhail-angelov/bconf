FROM node:8.14.0-alpine

MAINTAINER Mikhail.Angelov (@MikhailAngelov)

RUN mkdir -p /opt/bconf/server
WORKDIR /opt/bconf

RUN export TERM=xterm
RUN npm install forever -g

COPY ./package.json ./
COPY ./server/package.json ./
RUN npm install --production

#COPY ./dist dist
COPY ./server server

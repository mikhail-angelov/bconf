#FROM ubuntu:14.04
FROM node:0.10-slim
RUN apt-get update -y && apt-get install -y wget supervisor build-essential
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /data
RUN mkdir -p /logs
RUN cd /opt && wget http://www.haproxy.org/download/1.5/src/haproxy-1.5.3.tar.gz
RUN cd /opt && tar xzf haproxy-1.5.3.tar.gz
RUN cd /opt/haproxy-1.5.3 && make TARGET=linux2628 && make install
ADD haproxy.cfg /opt/haproxy-1.5.3/haproxy.cfg
ADD supervisor.conf /etc/supervisor/conf.d/supervisor.conf

RUN mkdir -p /opt/bconf
WORKDIR /opt/bconf
ADD package.json /opt/bconf/package.json
RUN cd /opt/bconf && npm install --production

ADD app.js /opt/bconf/app.js
ADD backend /opt/bconf/backend
ADD frontend /opt/bconf/frontend

ADD config.js /opt/bconf/config.js

EXPOSE 80 3001 3002

#CMD "/usr/bin/supervisord"
CMD "bash"

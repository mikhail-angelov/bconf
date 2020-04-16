FROM node:12

WORKDIR /opt/app

COPY ./mserver/package*.json ./mserver/

RUN cd mserver \
    && npm ci \
    && rm -rf node_modules/clang-tools-prebuilt node_modules/mediasoup/worker/out/Release/*.a node_modules/mediasoup/worker/out/Release/obj.target

COPY ./mserver/src/* ./mserver/src/
COPY ./mini/src/* ./mini/src/

WORKDIR /opt/app/mserver

EXPOSE 8000
ENV PORT 8000
ENV HOST 0.0.0.0
# CMD ["npm", "start"]
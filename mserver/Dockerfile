FROM node:12

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci \
    && rm -rf node_modules/clang-tools-prebuilt node_modules/mediasoup/worker/out/Release/*.a node_modules/mediasoup/worker/out/Release/obj.target

COPY mediasoup_v3_multiroom.js ./
COPY public ./public

EXPOSE 8000
ENV PORT 8000
ENV HOST 0.0.0.0
CMD ["node", "mediasoup_v3_multiroom.js"]
FROM node:22-alpine

WORKDIR /usr/src/app

RUN mkdir -p be ui be/assets

COPY /be/package*.json /usr/src/app/be
COPY /ui/package*.json /usr/src/app/ui

RUN cd be && npm install
RUN cd ui && npm install

COPY be /usr/src/app/be
COPY ui /usr/src/app/ui

RUN cd be && npm run build
RUN cd ui && npm run build

RUN mv ui/dist/* be/assets

RUN rm -rf ui

WORKDIR /usr/src/app/be

CMD ["npm", "start"]

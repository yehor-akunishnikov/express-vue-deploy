FROM node:22-alpine

WORKDIR /usr/src/app

ARG PORT
ARG NODE_ENV
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG POSTGRES_PORT

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_PORT=${POSTGRES_PORT}

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

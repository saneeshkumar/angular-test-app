FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build:prd

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/APM /usr/share/nginx/html

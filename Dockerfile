FROM node:12.20-alpine as builder

# Intall global dependencies
RUN apk add --no-cache git
RUN npm install -g @angular/cli@6.0.8

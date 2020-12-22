FROM node:12.20-alpine as builder

# Intall global dependencies
RUN apk add --no-cache git
RUN npm install -g @angular/cli@11.0.5

# Copy source
WORKDIR /source
ADD . /source

# Install dependencies
RUN npm install

# Build
RUN npm run build:prod

# ----------------------------------
# Prepare production environment
FROM nginx:alpine
# ----------------------------------

# Clean nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy dist
WORKDIR /usr/share/nginx/html

COPY --from=builder /source/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Permission
RUN chown root /usr/share/nginx/html/*
RUN chmod 755 /usr/share/nginx/html/*

# Expose port
EXPOSE 2000

# Start
CMD ["nginx", "-g", "daemon off;"]

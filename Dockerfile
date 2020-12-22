FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/APM /usr/share/nginx/html

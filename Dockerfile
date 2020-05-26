FROM node:12-alpine as base

# =====================
# Stage 1 - build
FROM base as builder
WORKDIR /app

# node-gyp needs python
RUN apk add --no-cache --virtual .gyp python make g++

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy source and build
COPY . ./
RUN npm run build:prod

# =====================
# Stage 2 - webserver with nginx
FROM nginx:1.12-alpine
COPY --from=builder /app/www /usr/share/nginx/html
COPY --from=builder /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

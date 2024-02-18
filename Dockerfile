FROM node:20.11.0
SHELL ["/bin/bash", "-c"]
EXPOSE 3000/tcp

RUN npm i -g pnpm

WORKDIR /app

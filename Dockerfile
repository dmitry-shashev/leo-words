FROM node:20.11.0
SHELL ["/bin/bash", "-c"]
EXPOSE 3000/tcp

RUN npm i -g pnpm
RUN npx playwright install-deps

WORKDIR /app
RUN chmod 777 /app
USER node

RUN pnpm init
RUN pnpm add -D playwright
RUN npx playwright install


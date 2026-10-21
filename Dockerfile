FROM node:26-bookworm-slim

# Create app directory
WORKDIR /usr/src/app

COPY dist/ ./dist/

EXPOSE 4000

CMD [ "node", "dist/frontend/server/server.mjs" ]

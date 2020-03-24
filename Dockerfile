FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY dist/ ./dist/

EXPOSE 4000

CMD [ "node", "dist/frontend/server/main.js" ]
FROM node:25

RUN apt-get update

RUN apt-get install -y python3 python-is-python3

# Create app directory
WORKDIR /usr/src/app

COPY dist/ ./dist/

EXPOSE 4000

CMD [ "node", "dist/frontend/server/server.js" ]
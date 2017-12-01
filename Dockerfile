FROM node:9.2
WORKDIR /app
ADD . /app
RUN npm install

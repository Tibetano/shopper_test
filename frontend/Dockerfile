FROM node:20

WORKDIR /temp/reat

COPY ./frontend/package*.json ./
RUN npm install

COPY .env .
COPY ./frontend/ .

RUN npm run build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /temp/reat

 
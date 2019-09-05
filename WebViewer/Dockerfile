FROM ubuntu:16.04

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl openjdk-8-jdk

RUN curl -sL https://deb.nodesource.com/setup_8.x |bash -

RUN apt-get install nodejs -y

WORKDIR /usr/src/app

COPY ./webviewer-api/package*.json ./webviewer-api/
COPY ./webviewer-ui/package*.json ./webviewer-ui/
RUN cd webviewer-api && npm install
RUN cd webviewer-ui && npm install
RUN npm install -g webpack webpack-cli

# RUN mkdir /etc/cert && \
#     cd /etc/cert && \
#     openssl genrsa > key.pem && \
#     openssl req -new -x509 -key key.pem -out cert.pem -days 1095 \
#     -subj "/C=AR/ST=Argentina/L=Argentina/O=Global Security/OU=IT Department/CN=localhost" && \
#     chmod 600 key.pem cert.pem && \
#     chown ${USER} key.pem cert.pem


COPY . .

# CMD [ "npm", "start" ]
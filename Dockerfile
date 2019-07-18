FROM node:carbon

ARG MACHINE_NAME=beatbox-admin
ENV MACHINE_NAME=${MACHINE_NAME}

# app directory
WORKDIR /usr/src/beatbox-admin
RUN mkdir -p /usr/src/beatbox-admin/logs
RUN mkdir -p /usr/src/beatbox-admin/downloads

# install app dependencies
COPY package.json ./

# install nano cmd editor as it's not bundled with node:carbon
RUN apt-get update
RUN apt-get install nano
# RUN npm rebuild bcrypt --build-from-source

RUN npm install
RUN npm install pm2 -g

# bundle app ADD source
COPY serve.js ./
COPY src/client/build ./src/client/build

EXPOSE 8001
# todo define run script for both server and backend in forever mode
# CMD ["./node_modules/.bin/pm2-docker", "run", "server"]
# CMD pm2-docker --public q0o7w0cvxs0nh79 --secret g2ohphn8dts4he0 server/loader.js --machine-name $MACHINE_NAME
CMD pm2-docker serve.js --machine-name $MACHINE_NAME
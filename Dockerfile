FROM node:15-buster-slim

RUN mkdir /opt/my-fashion-store
WORKDIR /opt/my-fashion-store

COPY [ "package.json", "yarn.lock", "./" ]
RUN yarn install

COPY . .

CMD ["yarn", "start"]
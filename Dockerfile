FROM node:8.2
MAINTAINER tuobc@grapedu.cn

RUN echo "Asia/Shanghai" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

ADD . /question-admin-web
WORKDIR /question-admin-web

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

VOLUME /question-admin-web/logs

EXPOSE 3000

CMD ["npm", "start"]

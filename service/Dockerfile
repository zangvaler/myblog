
FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/src/blog
ADD . /usr/src/blog
# RUN npm install -g pm2
RUN npm config set registry https://registry.npm.taobao.org/ && \  
    npm i
# RUN npm i
EXPOSE 3000
#pm2在docker中使用命令为pm2-docker
# CMD ["pm2-runtime", "start", "--json", "process.json"]
CMD ["pm2-runtime", "start",  "process.yml"]





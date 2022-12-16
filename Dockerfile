FROM node:slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3030
CMD node index.js
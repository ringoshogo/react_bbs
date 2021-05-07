FROM node
WORKDIR /app
COPY ./bbs/package.json .
RUN npm install
COPY ./bbs .
CMD ["npm", "start"]
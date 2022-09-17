FROM node:16.17.0-alpine3.16

RUN addgroup app && adduser -SG app app
RUN mkdir /app && chown app:app /app
USER app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "dev"]



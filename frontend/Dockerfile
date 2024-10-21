#API
FROM node:lts-alpine

WORKDIR /app/frontend

COPY package.json package-lock.json ./

#USER node

RUN npm i

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]

FROM node:16.9.0-alpine
WORKDIR /
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]
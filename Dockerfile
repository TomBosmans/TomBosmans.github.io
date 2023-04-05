FROM node:18-alpine
WORKDIR /app
EXPOSE 3100
RUN npm install -g npm@latest
RUN npm i -g @nestjs/cli
CMD ["npm", "run", "start:dev"]

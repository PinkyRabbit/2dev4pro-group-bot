FROM node:14
WORKDIR /app/telegram-group-bot
COPY package.json ./
COPY .env.sample ./.env
RUN npm install -s
CMD ["npm", "run", "start:dev"]

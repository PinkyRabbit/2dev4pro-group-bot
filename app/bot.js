const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_KEY;

function initTelegramBot(callback) {
  const bot = new TelegramBot(token, {polling: true});
  return callback(bot);
}

module.exports = initTelegramBot;

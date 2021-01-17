const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_KEY;

function initTelegramBot(callback) {
  const bot = new TelegramBot(token, {polling: true});

  bot.on('message', (message) => {
    const chatId = message.chat.id;

    if (message.text === 'ping') {
      return bot.sendMessage(chatId, 'Pong 🏓');
    }

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  });

  return callback(bot);
}

module.exports = initTelegramBot;

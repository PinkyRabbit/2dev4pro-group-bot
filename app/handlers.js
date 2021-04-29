const { messageFor } = require('./messages');

const chatId = process.env.TELEGRAM_CHAT_ID;

const parseMode = { parse_mode: 'Markdown' };

function reward(context) {
  const { body, bot } = context.request;
  const text = messageFor.reward(body);
  bot.sendMessage(chatId, text, parseMode);
  context.body = { success: 1 };
}

function topic(context) {
  const { body, bot } = context.request;
  const text = messageFor.topic(body);
  bot.sendMessage(chatId, text, parseMode);
  context.body = { success: 1 };
}

function admin(context) {
  const { body, bot } = context.request;
  const text = messageFor.admin(body);
  bot.sendMessage(chatId, text, parseMode);
  context.body = { success: 1 };
}

module.exports = {
  handlerFor: { reward, topic, admin },
};

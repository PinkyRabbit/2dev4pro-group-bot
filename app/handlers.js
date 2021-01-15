const { messageFor } = require('./messages');

const chatId = process.env.TELEGRAM_CHAT_ID;

const parseMode = { parse_mode: 'Markdown' };

function reward(context) {
  const { body, bot } = context.request;
  const text = messageFor.reward(body.username, body.rewardTitle, body.rewardDescription);
  bot.sendMessage(chatId, text, parseMode);
  context.body = { success: 1 };
}

module.exports = {
  handlerFor: { reward },
};

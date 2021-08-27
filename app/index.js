const initTelegramBot = require('./bot');
const catchMessagesFromApi = require('./bull');

initTelegramBot((bot) => catchMessagesFromApi(bot));


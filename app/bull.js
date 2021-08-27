const Queue = require('bull');

const { messageFor } = require('./messages');

const {
  TELEGRAM_CHAT_ID,
  QUEUE_GROUP_BOT,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

const redis = {
  host: REDIS_HOST || 'localhost',
  port: REDIS_PORT ? Number.parseInt(REDIS_PORT) : 6379,
  password: REDIS_PASSWORD,
  connectTimeout: 17000,
  maxRetriesPerRequest: 4,
  retryStrategy: (times) => Math.min(times * 30, 1000),
};


const queue = new Queue(QUEUE_GROUP_BOT, { redis });

function extractMessage(data) {
  let message;
  console.log(data);
  switch (data.type) {
    case 'new-topic':
      message = messageFor.topic(data);
      break;
    case 'managing-admins':
      message = messageFor.admin(data);
      break;
    case 'reward':
      message = messageFor.reward(data);
      break;
    default:
      throw new Error(`Unsupported message type "${type}"`);
  }
  return message;
}

function catchMessagesFromApi(bot) {
  queue.process((job, done) => {
    console.log(job);
    const { data } = job;
    const message = extractMessage(data);
    bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
    done();
  });
}

module.exports = catchMessagesFromApi;

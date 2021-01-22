const messageFor = {
  reward: (username, title, description) => [
    `💥 @${username}, поздравляем!`,
    '---',
    `Вы получили награду: *${title}*🎖`,
    ' ',
    `_${description}_`,
  ].join('\n'),
  topic: (username, topic) =>
    `🥶 Пользователь @${username} создал новую категорию *${topic}*.`,
};

module.exports = { messageFor };

const messageFor = {
  reward: (username, title, description) => [
    `💥 @${username}*, поздравляем!* 💥`,
    '---',
    `Вы получили награду: *${title}*`,
    ' ',
    `_${description}_`,
  ].join('\n'),
};

module.exports = { messageFor };

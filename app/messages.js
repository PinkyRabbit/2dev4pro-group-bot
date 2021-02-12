const messageFor = {
  reward: (username, title, description) => 
    username
    ? [
      `💥 @${username}, поздравляем!`,
      '---',
      `Вы получили награду: *${title}*🎖`,
      ' ',
      `_${description}_`,
    ].join('\n')
    : [
      `💥 Пользователь *со скрытым ником* получает награду: *${title}*🎖`,
      ' ',
      `_${description}_`,
    ].join('\n'),
  topic: (username, topic) => [
    `Пользователь ${username ? `@${username}` : '(Имя скрыто)'} создал новый раздел *${topic}*.`,
    '🥶  🎃  🥶  🎃  🥶',
  ].join('\n'),
};

module.exports = { messageFor };

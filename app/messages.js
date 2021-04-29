function getUsername({ username }) {
 return username ? `@${username}` : '*со скрытым ником*';
}

function toMessage(array, { isDev }) {
  const strings = isDev
    ? [
      '⚙️ DEV SERVER ⚙️',
      ' ',
      ...array
    ] 
    : array;
  return strings.join('\n');
}

const messageFor = {
  reward: (data) => 
    data.username
    ? toMessage([
      `💥 @${data.username}, поздравляем!`,
      '---',
      `Вы получили награду: *${data.rewardTitle}*🎖`,
      ' ',
      `_${data.rewardDescription}_`,
    ], data)
    : toMessage([
      `💥 Пользователь *со скрытым ником* получает награду: *${data.rewardTitle}*🎖`,
      ' ',
      `_${data.rewardDescription}_`,
    ], data),
  topic: (data) => toMessage([
    `Пользователь ${getUsername(data)} создал новый раздел`,
    `*${data.topic}*`,
    '🥶  🎃  🥶  🎃  🥶',
  ], data),
  admin: (data) =>  {
    return data.isPositive
      ? toMessage([
        `Пользователь ${getUsername(data)} теперь модератор.`,
        '🍹 🍹 🍹 🍹 🍹',
        'Просим любить и жаловать!'
      ], data)
      : toMessage([
        `Пользователь ${getUsername(data)} больше не модератор.`,
        '🥁 🥁 🥁 🥁 🥁',
        'Благодарим за работу в команде! Желаем успехов!'
      ], data);
  },
};

module.exports = { messageFor };

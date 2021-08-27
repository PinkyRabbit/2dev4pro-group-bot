function getUsername({ username }) {
  const result = { u: '*со скрытым ником*', isHidden: true };
  if (username) {
    result.isHidden = false;
    const usernameAsWord = /\w/.exec(username);
    result.u = username === usernameAsWord ? `@${username}` : `*${username}*`;
  }
  return result;
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
  reward: (data) => {
    const { u, isHidden } = getUsername(data);
    return isHidden
      ? toMessage([
        `💥 Пользователь ${u} получает награду: *${data.rewardTitle}*🎖`,
        ' ',
        `_${data.rewardDescription}_`,
      ], data)
      : toMessage([
        `💥 ${u}, поздравляем!`,
        '---',
        `Вы получили награду: *${data.rewardTitle}*🎖`,
        ' ',
        `_${data.rewardDescription}_`,
      ], data);
  },
  topic: (data) => toMessage([
    `Пользователь ${getUsername(data).u} создал новый раздел`,
    `*${data.topic}*`,
    '🥶  🎃  🥶  🎃  🥶',
  ], data),
  admin: (data) =>  {
    return data.isPositive
      ? toMessage([
        `Пользователь ${getUsername(data).u} теперь модератор.`,
        '🍹 🍹 🍹 🍹 🍹',
        'Просим любить и жаловать!'
      ], data)
      : toMessage([
        `Пользователь ${getUsername(data.u)} больше не модератор.`,
        '🥁 🥁 🥁 🥁 🥁',
        'Благодарим за работу в команде! Желаем успехов!'
      ], data);
  },
};

module.exports = { messageFor };

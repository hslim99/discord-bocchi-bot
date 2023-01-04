exports.reactGeun = (message) => {
  if (message.content.includes('근')) {
    const emoji = message.guild.emojis.cache.find((emoji) => emoji.name === 'rmslogo');
    message.react(emoji);
  }
};

exports.reactQuestion = (message) => {
  const str = message.content.replace(/\?/g, '');
  if (str === '' && message.content.length > 0) {
    message.channel.send(`?`);
  }
};

exports.reactBHJ = (message) => {
  if (message.content === '아') {
    message.channel.send(`와타시노코이와`);
  }
};

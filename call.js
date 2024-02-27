exports.call = (message, args, client) => {
  const regex = /^<@!?(\d+)>$/;
  const users = [];
  for (const mention of args) {
    const matches = mention.match(regex);
    if (!matches) {
      return;
    }
    const user = client.users.cache.get(matches[1]);
    if (user) {
      users.push(mention);
    }
  }

  if (users.length > 0) {
    const times = Math.floor(30 / users.length);
    const repeat = Array(times).fill(users).flat();
    message.channel.send(repeat.join(' '));
  }
};

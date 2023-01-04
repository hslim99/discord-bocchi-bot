exports.random = (message, args) => {
  const selected = args[Math.floor(Math.random() * args.length)];
  message.channel.send(selected);
};

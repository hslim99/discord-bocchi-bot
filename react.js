exports.reactGeun = (message) => {
    if (message.content.includes('근')) {
        const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'rmslogo');
        message.react(emoji);
    }
}
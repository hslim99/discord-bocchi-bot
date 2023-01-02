const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.login('MTA1OTI3NzAzNTE0MDI5NjczNA.GB4lak.-0y5M8qpAy3sa-bCZaIkrkQmGk68pKKuoanBDY');

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'meal') {
        const meal = meals[Math.floor(Math.random() * meals.length)];
        message.channel.send(`How about ${meal}?`);
    }

    console.log(args);

    if (command === 'addmeal') {
        meals.push(args[0]);
        console.log(meals);
        message.channel.send(`${args[0]} has been added to meal list!`);
    }
});

client.on('ready', () => {
    console.log(`${client.user.tag}에 로그인하였습니다!`);
});

const meals = ['Hamburger'];
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

require('dotenv').config();

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
const meal = require('./meal');

client.login(process.env.TOKEN);

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'meal') {
        meal.meal(message);
    }
    if (command === 'addmeal') {
        meal.addMeal(message, args);
    }
    if (command === 'removemeal') {
        meal.removeMeal(message, args);
    }
    if (command === 'meallist') {
        meal.mealList(message);
    }
    if (command === '켁븜') {
        message.channel.send(`헤롱헤롱쿨쿨켁켁븜냐냥븜로롱꿈나라둥둥쯉쯉븜구리븜미응애`);
    }
});

client.on('ready', () => {
    console.log(`${client.user.tag}에 로그인하였습니다!`);
});

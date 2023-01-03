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
const { Pool } = require('pg');
exports.pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});
const meal = require('./meal');
const react = require('./react');

require('dotenv').config();
client.login(process.env.TOKEN);

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) {
    react.reactGeun(message);
    return;
  }

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
  replacer.reactGeun(message);
});

client.on('ready', () => {
  console.log(`${client.user.tag}에 로그인하였습니다!`);
});

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
const { Pool } = require('pg');
exports.pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const meal = require('./meal');
const react = require('./react');
const util = require('./util');

client.login(process.env.TOKEN);

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) {
    react.reactGeun(message);
    react.reactQuestion(message);
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
  if (command === '헉븜') {
    message.channel.send(`헉븜켁븜싹븜븜데렐루도동도동가제일귀여운건누구바로븜미짱도동가동가`);
  }
  if (command === 'random') {
    util.random(message, args);
  }
  react.reactGeun(message);
});

client.on('ready', () => {
  console.log(`${client.user.tag}에 로그인하였습니다!`);
});

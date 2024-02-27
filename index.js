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
const call = require('./call');
const react = require('./react');
const util = require('./util');
const image = require('./image');

client.login(process.env.TOKEN);

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) {
    react.reactGeun(message);
    react.reactQuestion(message);
    return;
  }

  const command = message.content.slice(1).split(' ')[0].toLowerCase();
  const args = message.content.slice(1).split(' ').slice(1);

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
  if (command === 'call') {
    call.call(message, args, client);
  }
  if (command === '켁븜') {
    message.channel.send(`헤롱헤롱쿨쿨켁켁븜냐냥븜로롱꿈나라둥둥쯉쯉븜구리븜미응애`);
  }
  if (command === '헉븜') {
    message.channel.send(`헉븜켁븜싹븜븜데렐루도동도동가제일귀여운건누구바로븜미짱도동가동가`);
  }
  if (command === '1557') {
    message.channel.send(
      `근데 드레이븐🎅이 문제에요 이 와중에 진짜 예 타워🏦 안쪽 그래도 잭키러브🎅가 문제에요 케넨🌩없을때 그래도 이쪽도⏩⏩ 달려들어야되는거아닌가요 재키러브🎅가문제에요 예 스턴걸고 쫓아가자 재키러브🎅가 아아악😱😱 잭키러브🎅🎅가 문제에요 돈도왕창떨어졌고요💵💵💵💵 재키러브 어떡하나요😱😱😱😱 저 재키러브를 또 더블킬 케넨🌩이없어요🙅🙅 재키러브가 퍽퍽🤜🤜 케넨🌩🌩이 없어요 기다려라 근데 이겼어요 좀 그만죽여 나도좀 죽이자😈😈 더샤이 오고있습니다 트리플킬 그리고 밀면되나요 왜이렇게빨리끝내나요 아이지❓❓😰😰😰😢😢😢 이거 16분대 16분되기전에 이건아이지 이건 역대급인데요 와 아니 16분이 안됩니다 와 15분 50초 아이지 야 빨리 끝내자 기록🌟🌟이라도 세우자 끝났습니다 15분 55초 56초 쥐쥐🔥🔥`,
    );
  }
  if (command === 'random') {
    util.random(message, args);
  }
  if (command === 'upload') {
    image.saveImage(message);
  }
  if (command === 'image') {
    image.sendImage(message);
  }
  if (command === 'listimage') {
    image.listImage(message, args[1]);
  }
  if (command === 'removeimage') {
    image.removeImage(message, args[1]);
  }
  react.reactGeun(message);
});

client.on('ready', () => {
  console.log(`${client.user.tag}에 로그인하였습니다!`);
});

const cron = require('cron');
const job = new cron.CronJob(
  '01 57 15 * * *',
  () => {
    client.channels.cache.get('1057498298363166723').send(`1557`);
  },
  (timeZone = 'Asia/Seoul'),
);
job.start();

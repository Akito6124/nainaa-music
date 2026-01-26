const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.once('ready', () => {
  console.log('🎵 Nainaa Music is online!');
});

client.login(process.env.TOKEN);

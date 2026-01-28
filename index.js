const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder 
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all commands"),

  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot latency")
].map(cmd => cmd.toJSON());

client.once("clientReady", async () => {
  console.log("🎵 Nainaa Music is online!");

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log("✅ Slash commands registered!");
  } catch (err) {
    console.error(err);
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "help") {
    await interaction.reply(
      "🎵 *Nainaa Music Commands*\n\n`/ping` – test bot\n`/help` – show commands"
    );
  }

  if (interaction.commandName === "ping") {
    await interaction.reply("🏓 Pong! Bot is working.");
  }
});

client.login(process.env.TOKEN);

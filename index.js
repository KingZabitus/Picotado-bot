// pegando as classes do discord.js
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token, client_id, guild_id } = require('./config.json');
//configurando dotenv
/* const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.dotenv; */

//importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

// criando nova instância de cliente
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`esse comando em ${filePath} está com data ou execute ausente`)
    }
}

// login do bot
client.once(Events.ClientReady, c => {
    console.log(`Pronto! Logado como ${c.user.tag}`)
});
client.login(token);

// listener de interações com o bot

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error("Comando não encontrado");
        return;
    }
    try{
        await command.execute(interaction)
    }
    catch (error) {
        console.error(error)
        await interaction.reply("Houve um erro ao executar esse comando!");
    }
})
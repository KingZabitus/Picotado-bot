const { token, client_id, guild_id } = require('./config.json');
const { REST, Routes } = require("discord.js");

const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = []

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

//instância REST
const rest = new REST({version: "10"}).setToken(token);

// Deploy

(async () => {
    try {
        console.log(`resetando  ${commands.length} comandos...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(client_id, guild_id),
            {body: commands}
        )
        console.log("comandos registrados com sucesso")
    }
    catch(error){
        console.error(error);
    }
})()
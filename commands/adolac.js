const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("adolac")
        .setDescription("Responde com a imagem de Adolac morrendo de novo!"),

    async execute(interaction) {
        await interaction.reply({ content: 'Adolac morreu de novo', files: ['https://i.imgur.com/8kJqr5m.png']});
    }
}   
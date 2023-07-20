const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping-pong'),

    async execute(interaction) {
        const startTimestamp = Date.now();
        await interaction.reply('Calculando o ping...');
        const latency = Date.now() - startTimestamp;
        setTimeout(() => {
            interaction.editReply(`🏓 Pong! Latência do servidor: ${latency}ms`);
        }, 2500);
    }
}
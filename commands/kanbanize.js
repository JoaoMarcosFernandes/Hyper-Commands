const { SlashCommandBuilder, ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanbanize')
        .setDescription('teste description')
        .addStringOption(option =>
            option.setName('titulo')
                .setDescription('Insira um titulo para a sugestao de melhoria')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('descricao')
                .setDescription('Insira uma descricao para a sugestao de melhoria')
                .setRequired(true)),
                
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        let title = interaction.options.get('titulo');
        let desc = interaction.option.get('descricao');
        console.log({title, desc});
        await interaction.reply({content: title, desc});
    },
}


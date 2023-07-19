const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const exampleEmbed = new EmbedBuilder()
    .setColor("Blue")
    .setTitle('**Guia de comandos do Bot Hyperflow**')
    .setDescription(`Aqui estão alguns comandos que podem ser utilizados.`)
    .addFields(
        { name: '\u200B', value: '\u200B'},
        { name: '🏓  Ver ping (tudo bugado essa merda)', value: `**\`/ping\`**`, inline: false },
        { name: '\u200B', value: '\u200B'},
    )
    .setFooter({ text: 'Bot - Hyperflow', iconURL: 'https://media.licdn.com/dms/image/D4D0BAQFcD00YTNzysQ/company-logo_200_200/0/1686144708245?e=2147483647&v=beta&t=iR0Ao7Aa8J9oRhukS-Im3cvfLshN6iANLmfv8dV3HXI' });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra os comandos disponíveis'),

    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] })
    }
}
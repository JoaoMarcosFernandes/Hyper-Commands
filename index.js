
const { Client, Events, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const kanbanize = require('./commands/kanbanize')
const ping = require('./commands/ping')
const help = require('./commands/help')

// dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

// importacao dos comandos
const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandFiles) {
    const filepath = path.join(commandsPath, file)
    const command = require(filepath)

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filepath} está com "data" ou "execute" ausentes`)
    }
}

// Login do bot
client.once(Events.ClientReady, c => {
    console.log(`${c.user.tag} realizou o login!`)
})

client.login(TOKEN);

// Listener de interacoes com o bot
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.commandName
    if (!command) {
        console.error(`Comando ${interaction.commandName} não encontrado`)
        await interaction.reply({ content: `Comando ${interaction.commandName} não encontrado` })
        return
    }

    if (command === 'kanbanize' && interaction.channelId == "1118227062541529090") {
        kanbanize.execute(interaction)
    } else if (command === 'ping') {
        ping.execute(interaction)
    } else if (command === 'help') {
        help.execute(interaction)
    } else {
        const exampleEmbed = new EmbedBuilder()
            .setAuthor({
                name: "Comando não permitido nesse canal! ❌",
            })
            .setTitle("Acesse o canal \"sugestões-de-melhorias\" para utilizar o comando!")
            .setURL("https://discord.com/channels/1118227061669105705/1118227062541529090")

            .setThumbnail("https://media.licdn.com/dms/image/D4D0BAQFcD00YTNzysQ/company-logo_200_200/0/1686144708245?e=2147483647&v=beta&t=iR0Ao7Aa8J9oRhukS-Im3cvfLshN6iANLmfv8dV3HXI")
            .setColor("#ff0000")
            .setFooter({
                text: "Hyperflow",
                iconURL: "https://media.licdn.com/dms/image/D4D0BAQFcD00YTNzysQ/company-logo_200_200/0/1686144708245?e=2147483647&v=beta&t=iR0Ao7Aa8J9oRhukS-Im3cvfLshN6iANLmfv8dV3HXI",
            })
            .setTimestamp();
        interaction.reply({ embeds: [exampleEmbed] })
    }
})
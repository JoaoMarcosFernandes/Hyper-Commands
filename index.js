const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

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

const subcomando1Data = {
    name: 'subcomando1',
    description: 'Descrição do Subcomando 1',
  };
  

// Listener de interacoes com o bot
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error(`Comando ${interaction.commandName} não encontrado`)
        return
    }
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'Ocorreu um erro ao executar esse comando', ephemeral: true })
    }
})
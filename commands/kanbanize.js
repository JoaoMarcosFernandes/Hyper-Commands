const axios = require('axios')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanbanize')
        .setDescription('Comando para a criar um card no Kanbanize no board de PRODUTO')
        .addStringOption(option =>
            option.setName('titulo')
                .setDescription('Insira um titulo para a sugestão de melhoria')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('descricao')
                .setDescription('Insira uma descrição para a sugestão de melhoria')
                .setRequired(true)),

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        let title = interaction.options._hoistedOptions[0].value;
        let desc = interaction.options._hoistedOptions[1].value
        const options = {
            method: 'POST',
            url: 'https://hyperflow.kanbanize.com/api/v2/cards',
            headers: {
                apikey: process.env.KANBANIZE_APIKEY,
                'Content-Type': 'application/json'
            },
            data: {
                "title": title,
                "description": `<p>${desc}</p>`,
                "custom_id": null,
                "owner_user_id": null,
                "type_id": 4,
                "size": null,
                "priority": 3,
                "color": "42af49",
                "position": 100,
                "column_id": 21,
                "lane_id": 19,
                "exceeding_reason": null,
                "deadline": null,
                "custom_fields_to_add_or_update": [
                    {
                        "field_id": 16,
                        "value": 0
                    },
                    {
                        "field_id": 19,
                        "value": 0
                    },
                    {
                        "field_id": 20,
                        "value": 0
                    }
                ],
                "reference": "NC"
            }
        }

        const successEmbed = new EmbedBuilder()
            .setTitle("Nova sugestão de melhoria! 🔥")
            .setDescription(`A sugestão de melhoria foi solicitada com sucesso! 🚀\n \nAcompanhe  o canal \"novas-features\" para ficar por dentro de todas novidades. \n\n\n> ** _Título_**\n>  ${title}\n\n> ** _Descrição_**\n>   ${desc}\n\n> ** _Solicitante_**\n>  <@${interaction?.user?.id}>`)
            .setThumbnail("https://media.licdn.com/dms/image/D4D0BAQFcD00YTNzysQ/company-logo_200_200/0/1686144708245?e=2147483647&v=beta&t=iR0Ao7Aa8J9oRhukS-Im3cvfLshN6iANLmfv8dV3HXI")
            .setColor("Green")
            .setFooter({
                text: "Hyperflow",
                iconURL: "https://media.licdn.com/dms/image/D4D0BAQFcD00YTNzysQ/company-logo_200_200/0/1686144708245?e=2147483647&v=beta&t=iR0Ao7Aa8J9oRhukS-Im3cvfLshN6iANLmfv8dV3HXI",
            })
            .setTimestamp();
        await axios.request(options).then(function (response) {
            interaction.reply({ embeds: [successEmbed] })
            // interaction.reply({ content: `Sua sugestão de melhoria foi registrada com sucesso!  😄\n\n Acompanhe o canal "novas-features" para ficar por dentro de todas as atualizações. 🚀` })
        }).catch(function (error) {
            console.log(error)
            const failedEmbed = new EmbedBuilder()
            .setTitle("Não foi possível registrar sua sugestão. 😕")
            .setDescription(`Entre em contato com um administrador.`)
            .setThumbnail("https://media.licdn.com/dms/image/D4D0BAQFcD00YTNzysQ/company-logo_200_200/0/1686144708245?e=2147483647&v=beta&t=iR0Ao7Aa8J9oRhukS-Im3cvfLshN6iANLmfv8dV3HXI")
            .setColor("Red")
            .setFooter({
                text: "Hyperflow",
                iconURL: "https://media.licdn.com/dms/image/D4D0BAQFcD00YTNzysQ/company-logo_200_200/0/1686144708245?e=2147483647&v=beta&t=iR0Ao7Aa8J9oRhukS-Im3cvfLshN6iANLmfv8dV3HXI",
            })
            .setTimestamp();
            interaction.reply({ embeds: [failedEmbed] })
        });
    }
}
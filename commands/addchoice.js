const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addchoice')
        .setDescription('Add a choice to a vote')
        .addIntegerOption(option =>
            option.setName('voteid')
                .setDescription('Vote ID to add choice')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('emojiname')
                .setDescription('Emoji\'s name that will be used for vote')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Film name')
                .setRequired(true)
        ),
    async execute(interaction) {
        let data = JSON.parse(fs.readFileSync('./votes.json', 'utf8'));

        const voteid = interaction.options.getInteger('voteid');
        const emojiName = interaction.options.getString('emojiname');
        const name = interaction.options.getString('name');

        let ids = [];
        data.forEach(el => {
            ids.push(el.id);
        });
        if (!ids.includes(voteid)) {
            const msg = {
                "title": "Add Choice",
                "description": `The Vote ID: ${voteid} doesn't exist!`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ], ephemeral: true});
        }else{
            const choice = {
                title: name,
                emoji: emojiName
            }
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === voteid) {
                    data[i].choices.push(choice);
                }
            }
            console.log(data);
            fs.writeFileSync('./votes.json', JSON.stringify(data));

            const msg = {
                "title": "Add Choice",
                "description": `Choice successfully added to the vote (${voteid})!`,
                "color": 8311585,
                "fields": [
                    {
                        "name": "Film name",
                        "value": `${name}`,
                        "inline": true
                    },
                    {
                        "name": "Emoji to react with",
                        "value": `\:${emojiName}:`,
                        "inline": true
                    }
                ]
            };
            interaction.reply({ embeds: [ msg ] });
        }
    }
}
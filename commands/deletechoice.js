const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletechoice')
        .setDescription('Remove a choice to a vote')
        .addIntegerOption(option =>
            option.setName('voteid')
                .setDescription('Vote ID to add choice')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('Emoji that is used for vote')
                .setRequired(true)
        ),
    async execute(interaction) {
        let data = JSON.parse(fs.readFileSync('./votes.json', 'utf8'));

        const voteid = interaction.options.getInteger('voteid');
        const emoji = interaction.options.getString('emoji');
        let deleted = false;

        let ids = [];
        data.forEach(el => {
            ids.push(el.id);
        });
        if (!ids.includes(voteid)) {
            const msg = {
                "title": "Remove Choice",
                "description": `The Vote ID: ${voteid} doesn't exist!`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ], ephemeral: true});
        }else{
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === voteid) {
                    for (let j = 0; j < data[i].choices.length; j++) {
                        if (data[i].choices[j].emoji === emoji) {
                            data[i].choices.splice(j, 1);
                            deleted = true;
                        }
                    }
                }
            }

            fs.writeFileSync('./votes.json', JSON.stringify(data));

            if (deleted) {
                const msg = {
                    "title": "Remove Choice",
                    "description": `The choice is successfully removed from the vote (${voteid})!`,
                    "color": 8311585
                };
                interaction.reply({ embeds: [ msg ] });
            }else{
                const msg = {
                    "title": "Remove Choice",
                    "description": `The choice can not be found!`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ] });
            }
        }
    }
}
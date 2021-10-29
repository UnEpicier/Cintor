const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletevote')
        .setDescription('Delete a vote')
        .addIntegerOption(option =>
            option.setName('voteid')
                .setDescription('Vote ID to delete')
                .setRequired(true)    
        ),
    async execute(interaction) {
        let data = JSON.parse(fs.readFileSync('./votes.json', 'utf8'));
        const voteid = interaction.options.getInteger('voteid');
        let deleted = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === voteid) {
                data.splice(i, 1);
                deleted = true;
            }
        }

        fs.writeFileSync('./votes.json', JSON.stringify(data));

        if (deleted) {
            const msg = {
                "title": "Delete Vote",
                "description": `The vote (${voteid}) has been successfully deleted!`,
                "color": 8311585
            };
            interaction.reply({embeds: [ msg ]});
        } else {
            const msg = {
                "title": "Delete Vote",
                "description": `The vote (${voteid}) can't been found!`,
                "color": 13632027
            };
            interaction.reply({embeds: [ msg ]});
        }
    }
}
const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createvote')
        .setDescription('Create a vote'),
    async execute(interaction) {
        let data = JSON.parse(fs.readFileSync('./votes.json', 'utf8'));
        
        let ids = [];
        data.forEach(el => {
            ids.push(el.id);
        });

        let voteid = Math.floor(Math.random() * 99999);
        while (ids.includes(voteid)) {
            voteid = Math.floor(Math.random() * 99999);
        }

        const vote = {
            id: voteid,
            title: "VOTE",
            description: "Votez pour la prochaine séance",
            author: interaction.member.user.username,
            author_id: interaction.member.id,
            author_image: interaction.member.user.avatarURL(),
            choices: []
        };
        data.push(vote);
        fs.writeFileSync('./votes.json', JSON.stringify(data));

        const msg = {
            "title": "Create Vote",
            "description": `The vote (ID: ${voteid}) has been created!`,
            "color": 8311585
        };
        interaction.reply({ embeds: [ msg ] });
    }
}
const fs = require('fs');
const {SlashCommandBuilder} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startvote')
        .setDescription('Start a vote')
        .addIntegerOption(option =>
            option.setName('voteid')
                .setDescription('Vote ID to add choice')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('Time in minutes until the vote is finished')
                .setRequired(true)    
        ),
    async execute(interaction) {
        let data = JSON.parse(fs.readFileSync('./votes.json', 'utf8'));
        const voteid = interaction.options.getInteger('voteid');
        const minutes = interaction.options.getInteger('minutes');

        let vote;
        data.forEach(el => {
            if(el.id === voteid) {
                vote = el;
            }
        });
        const choices = vote.choices;

        const msg = new MessageEmbed()
            .setColor('4A90E2')
            .setTitle(vote.title)
            .setDescription(vote.description)
            .setAuthor(vote.author)
            .setThumbnail(vote.author_image)
            .setTimestamp()
        choices.forEach(el => {
            msg.addField(el.emoji, el.title, false);
        });
        interaction.reply({ embeds: [ msg ], fetchReply: true }).then(message => {
            choices.forEach(el => {
                message.react(el.emoji);
            });

            //Time out to end the vote
            setTimeout(() => {
                const reactions = message.reactions.cache;
                let high = 0;
                let emoji;
                reactions.forEach(reaction => {
                    if (reaction.count > high) {
                        high = reaction.count;
                        emoji = reaction['_emoji'].name;
                    }
                });
                message.delete();
                let filmName;
                choices.forEach(el => {
                    if (el.emoji === emoji) {
                        filmName = el.title;
                    }
                });
                const mess = {
                    "title": "Result of the vote!",
                    "description": `The choosed vote from the public is...\n**${filmName}** !!\nHave a nice show`,
                    "color": 8311585
                };
                interaction.channel.send({embeds: [ mess ]});
            }, minutes*60000);
        });
    }
}
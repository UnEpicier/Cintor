const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('muteall')
        .setDescription('Mute all users present in the sender voice channel'),
    async execute(interaction) {
        let mutedRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!mutedRole) {
            const msg = {
                "title": "Mute All",
                "description": `**ERROR: ** "Muted" role missing!`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ] })
        }else{    
            const sender = interaction.member;
            if (sender.voice.channel) {
                for (const [memberId, member] of sender.voice.channel.members) {
                    if (memberId != sender.id && !member.roles.cache.has(mutedRole.id)) {
                        member.roles.add(mutedRole);
                    }
                }
                const msg = {
                    "title": "Mute All",
                    "description": `All users in <#${sender.voice.channel.id}>  are now muted!`,
                    "color": 8311585
                };
                interaction.reply({ embeds: [ msg ] });
            }else{
                const msg = {
                    "title": "Mute All",
                    "description": `You are not in a voice channel!`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ], ephemeral: true });
            }
        }
    }
}
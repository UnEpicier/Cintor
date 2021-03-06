const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmuteall')
        .setDescription('Unmute all users present in the sender voice channel'),
    async execute(interaction) {
        let mutedRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!mutedRole) {
            const msg = {
                "title": "Unmute All",
                "description": `**ERROR: ** "Muted" role missing!`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ] })
        }else{    
            const sender = interaction.member;
            if (sender.voice.channel) {
                for (const [memberId, member] of sender.voice.channel.members) {
                    if (memberId != sender.id && member.roles.cache.has(mutedRole.id)) {
                        member.roles.remove(mutedRole);
                    }
                }
                const msg = {
                    "title": "Unmute All",
                    "description": `All users from <#${sender.voice.channel.id}> can now speak!`,
                    "color": 8311585
                };
                interaction.reply({ embeds: [ msg ] });
            }else{
                const msg = {
                    "title": "Unmute All",
                    "description": `You are not in a voice channel!`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ], ephemeral: true });
            }
        }
    }
}
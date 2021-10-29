const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmuteall')
        .setDescription('Unmute all users present in the sender voice channel'),
    async execute(interaction) {
        let mutedRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!mutedRole) {
            const msg = {
                "title": "unmuteAll Command",
                "description": `**ERREUR: ** Aucun role avec le nom "Muted" a été trouvé !`,
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
                    "title": "UnmmteAll Command",
                    "description": `Tout les membres de <#${sender.voice.channel.id}> peuvent maintenant parler !`,
                    "color": 8311585
                };
                interaction.reply({ embeds: [ msg ] });
            }else{
                const msg = {
                    "title": "UnmuteAll Command",
                    "description": `Vous n'êtes connecté à aucun salon vocal !`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ], ephemeral: true });
            }
        }
    }
}
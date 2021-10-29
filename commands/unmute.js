const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute given user')
        .addUserOption(option =>
            option.setName('usertag')
                .setDescription('The user to mute')
                .setRequired(true)
        ),
    async execute(interaction) {
        let mutedRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!mutedRole) {
            const msg = {
                "title": "Mute Command",
                "description": `**ERREUR: ** Aucun role avec le nom "Muted" a été trouvé !`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ] })
        }else{    
            const member = interaction.options.getMember('usertag', true);
            if (member.user.id != "903264069690216488") {
                if (member.roles.cache.has(mutedRole.id)) {
                    member.roles.remove(mutedRole);
                    const msg = {
                        "title": "Mute Command",
                        "description": `<@${member.id}> n'est maintenant plus mute !`,
                        "url": "https://discordapp.com",
                        "color": 8311585
                      };
                    interaction.reply({ embeds: [ msg ] });
                }else{
                    const msg = {
                        "title": "Mute Command",
                        "description": `<@${member.id}> peut déjà parler !`,
                        "url": "https://discordapp.com",
                        "color": 13632027
                    };
                    interaction.reply({ embeds: [ msg ], ephemeral: true });
                }
            }else{
                const msg = {
                    "title": "Mute Command",
                    "description": `Vous ne pouvez pas me mute !`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ], ephemeral: true });
            }
        }
    }
}
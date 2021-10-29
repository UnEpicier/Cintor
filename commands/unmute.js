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
                "title": "Unmute",
                "description": `**ERROR: ** "Muted" role missing!`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ] })
        }else{    
            const member = interaction.options.getMember('usertag', true);
            if (member.user.id != "903264069690216488") {
                if (member.roles.cache.has(mutedRole.id)) {
                    member.roles.remove(mutedRole);
                    const msg = {
                        "title": "Unmute",
                        "description": `<@${member.id}> is now unmuted!`,
                        "color": 8311585
                      };
                    interaction.reply({ embeds: [ msg ] });
                }else{
                    const msg = {
                        "title": "Unmute",
                        "description": `<@${member.id}> can already speak!`,
                        "color": 13632027
                    };
                    interaction.reply({ embeds: [ msg ], ephemeral: true });
                }
            }else{
                const msg = {
                    "title": "Unmute",
                    "description": `I can already speak!`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ], ephemeral: true });
            }
        }
    }
}
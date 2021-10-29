const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute given user')
        .addUserOption(option =>
            option.setName('usertag')
                .setDescription('The user to mute')
                .setRequired(true)
        ),
    async execute(interaction) {
        let mutedRole = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!mutedRole) {
            const msg = {
                "title": "Mute",
                "description": `**ERROR: ** "Muted" role missing!`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ] })
        }else{    
            const member = interaction.options.getMember('usertag', true);
            if (member.user.id != "903264069690216488") {
                if (member.roles.cache.has(mutedRole.id)) {
                    const msg = {
                        "title": "Mute",
                        "description": `<@${member.id}> is already muted!`,
                        "color": 13632027
                    };
                    interaction.reply({ embeds: [ msg ], ephemeral: true});
                }else{
                    member.roles.add(mutedRole);
                    const msg = {
                        "title": "Mute",
                        "description": `<@${member.id}> is now muted!`,
                        "color": 8311585
                    };
                    interaction.reply({ embeds: [ msg ] });
                }
            }else{
                const msg = {
                    "title": "Mute",
                    "description": `You can't mute me!`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ] , ephemeral: true });
            }
        }
    }
}
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
                "title": "Mute Command",
                "description": `**ERREUR: ** Aucun role avec le nom "Muted" a été trouvé !`,
                "color": 13632027
            };
            interaction.reply({ embeds: [ msg ] })
        }else{    
            const member = interaction.options.getMember('usertag', true);
            if (member.roles.cache.has(mutedRole.id)) {
                const msg = {
                    "title": "Mute Command",
                    "description": `<@${member.id}> est déjà mute !`,
                    "color": 13632027
                };
                interaction.reply({ embeds: [ msg ] });
            }else{
                member.roles.add(mutedRole);
                const msg = {
                    "title": "Mute Command",
                    "description": `<@${member.id}> est maintenant mute !`,
                    "color": 8311585
                };
                interaction.reply({ embeds: [ msg ] });
            }
        }
    }
}
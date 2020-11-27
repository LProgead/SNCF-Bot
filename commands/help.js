exports.run = (client, message, args) => {
    const { MessageEmbed } = require('discord.js');

    const help_embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor('#FAFAFA')
        .setTitle('Aide pour SNCF Bot')
        .addField('sncf.infogare [ville]', 'Obtenir des informations à propos d\'une gare')
        .addField('sncf.infotrajet [ville de départ] [ville d\'arrivée] [date de départ] [heure minimale de départ]', 'Obtenir un trajet entre deux gares')
        .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
        .setTimestamp()

    message.channel.send(help_embed);
};
exports.run = (client, message, args) => {
    const { MessageEmbed } = require('discord.js');

    const delay_embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor('#FAFAFA')
        .setTitle('Retards')
        .setDescription("Comme l'équipe de devéloppement de l'API SNCF devait être en grêve lorsqu'ils ont pensé (ou pas) à faire un endpoint pour lister tous les retards, je vous propose une super vidéo [YouTube très éducative](https://www.youtube.com/watch?v=Zb3LixrUmDw) sur les retards de la SNCF.")
        .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
        .setTimestamp()

    message.channel.send(delay_embed);
};
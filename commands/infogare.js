exports.run = (client, message, args) => {
    const axios = require('axios');
    const { MessageEmbed } = require('discord.js');
    const { MessageCollector } = require('discord.js');

    if (!args[1]) {
        const embed_args = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'une gare`, message.author.displayAvatarURL())
            .setTitle(`Merci d'indiquer tous les arguments demandés : gare recherchée.`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_args);
    }

    const gare = message.content.replace('sncf.infogare ', '')

    axios.get(`https://api.sncf.com/v1/coverage/sncf/places?q=${gare}&key=${process.env.api_key}`)
        .then(function (response) {
            const places = response.data.places;

            if (!places) {
                const embed_nodata = new MessageEmbed()
                    .setAuthor(`Réponse à la requête ${gare}`, message.author.displayAvatarURL())
                    .setTitle(`Aucune région administrative ni gare ne correspond à cette demande.`)
                    .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                    .setTimestamp()
                
                return message.channel.send(embed_nodata);
            }

            const embed_choose_place = new MessageEmbed()
                .setTitle('Réponse à la recherche d\'un trajet', message.author.displayAvatarURL)
                .setTitle('Gare(s) correspondant à votre demande')

            places.forEach((place, i) => {
                if (!place.stop_area) {
                    embed_choose_place.addField(parseInt(i) + parseInt(1), place.administrative_region.label)
                } else {
                    embed_choose_place.addField(parseInt(i) + parseInt(1), place.stop_area.label)
                }
            });

            message.channel.send(embed_choose_place);

            const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1 });
                
            collector.on('collect', answer => {
                if (places[answer.content - 1] === undefined) {
                    const embed_nodata = new MessageEmbed()
                        .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                        .setTitle(`Réponse invalide.`)
                        .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                        .setTimestamp()
                    
                    return message.channel.send(embed_nodata);
                }

                if (!places[answer.content - 1].stop_area) {
                    let zip_code;

                    switch (places[answer.content - 1].administrative_region.zip_code) {
                        case "":
                            zip_code = "Aucun code postal n'est attribué à cette région administrative."
                        break;

                        default:
                            zip_code = places[answer.content - 1].administrative_region.zip_code;
                        break;
                    }

                    const embed_administrative_region = new MessageEmbed()
                        .setAuthor(`Réponse à la requête ${gare}`, message.author.displayAvatarURL())
                        .setTitle(`${places[answer.content - 1].administrative_region.name} (${places[answer.content - 1].administrative_region.label})`)
                        .setDescription('Région administrative')
                        .addField('ID API', places[answer.content - 1].administrative_region.id)
                        .addField('Code postal', zip_code)
                        .addField('Coordonées', `Latitude : ${places[answer.content - 1].administrative_region.coord.lat} ; longitude : ${places[answer.content - 1].administrative_region.coord.lon}`)
                        .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                        .setTimestamp()

                    message.channel.send(embed_administrative_region);
                } else {
                    const embed_stop_area = new MessageEmbed()
                        .setAuthor(`Réponse à la requête ${gare}`, message.author.displayAvatarURL())
                        .setTitle(`${places[answer.content - 1].stop_area.name} (${places[answer.content - 1].stop_area.label})`)
                        .setDescription('Point d\'arrêt')
                        .addField('ID API', places[answer.content - 1].stop_area.id)
                        .addField('Fuseau horraire', places[answer.content - 1].stop_area.timezone)
                        .addField('Qualité du point d\'arrêt', places[answer.content - 1].quality)
                        .addField('Coordonées', `Latitude : ${places[answer.content - 1].stop_area.coord.lat} ; longitude : ${places[answer.content - 1].stop_area.coord.lon}`)
                        .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                        .setTimestamp()
                        
                    message.channel.send(embed_stop_area);
                }
            });
        });
}
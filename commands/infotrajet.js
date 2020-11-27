exports.run = (client, message, args) => {
    const axios = require('axios');
    const { MessageEmbed, MessageCollector, ReactionCollector } = require('discord.js');

    if (args.length != 5) {
        const embed_args = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`Merci d'indiquer tous les arguments demandés : la ville de départ, la ville d'arrivée, la date de départ et l'heure minimale de départ.`)
            .setFooter('Pensez à n\'indiquer que la ville pour vos gare d\'arrivée et de départ SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()

        return message.channel.send(embed_args);
    }

    if (!args[3].includes('/')) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`La date doit être sous le format JJ/MM/AAAA`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (args[3].split('/').length != 3) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`La date doit être sous le format JJ/MM/AAAA`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (args[3].split('/')[0].length != 2) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`La date doit être sous le format JJ/MM/AAAA`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (args[3].split('/')[1].length != 2) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`La date doit être sous le format JJ/MM/AAAA`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (args[3].split('/')[2].length != 4) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`La date doit être sous le format JJ/MM/AAAA`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (!args[4].includes(':')) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`L'heure doit être sous le format HH:MM`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (args[4].split(':').length != 2) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`L'heure doit être sous le format HH:MM`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (args[4].split(':')[0].length != 2) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`L'heure doit être sous le format HH:MM`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    if (args[4].split(':')[1].length != 2) {
        const embed_date = new MessageEmbed()
            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
            .setTitle(`L'heure doit être sous le format HH:MM`)
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()
        
        return message.channel.send(embed_date);
    }

    const date_args_joined = args[3].split('/').join('');

    const date = `${date_args_joined[4]}${date_args_joined[5]}${date_args_joined[6]}${date_args_joined[7]}${date_args_joined[2]}${date_args_joined[3]}${date_args_joined[0]}${date_args_joined[1]}`;

    const time = args[4].split(':').join('');

    let gare1;
    let gare2;

    axios.get(`https://api.sncf.com/v1/coverage/sncf/places?q=${args[1]}&key=${process.env.api_key}`)
        .then(function (response) {
            if (!response.data.places) {
                const embed_nodata = new MessageEmbed()
                    .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                    .setTitle(`Aucune gare ne correspond à cette demande.`)
                    .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                    .setTimestamp()
                
                return message.channel.send(embed_nodata);
            }

            const embed_choose_gare = new MessageEmbed()
                .setTitle('Réponse à la recherche d\'un trajet', message.author.displayAvatarURL)
                .setTitle('Gare(s) correspondant à votre demande')
                .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                .setTimestamp()

            const gares = response.data.places.filter(place => place.administrative_region === undefined);

            if (gares.length === 0) {
                const embed_nodata = new MessageEmbed()
                    .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                    .setTitle(`Aucune gare ne correspond à cette demande.`)
                    .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                    .setTimestamp()
                
                return message.channel.send(embed_nodata);
            }

            gares.forEach((place, i) => {
                embed_choose_gare.addField(parseInt(i) + parseInt(1), place.stop_area.label)
            });

            message.channel.send(embed_choose_gare);

            const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1 });
                
            collector.on('collect', answer => {
                if (gares[answer.content - 1] === undefined) {
                    const embed_nodata = new MessageEmbed()
                        .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                        .setTitle(`Réponse invalide.`)
                        .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                        .setTimestamp()
                    
                    return message.channel.send(embed_nodata);
                }

                gare1 = gares[answer.content - 1].stop_area.id;

                axios.get(`https://api.sncf.com/v1/coverage/sncf/places?q=${args[2]}&key=${process.env.api_key}`)
                    .then(function (response) {
                        if (!response.data.places) {
                            const embed_nodata = new MessageEmbed()
                                .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                                .setTitle(`Aucune gare ne correspond à cette demande.`)
                                .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                                .setTimestamp()
                            
                            return message.channel.send(embed_nodata);
                        }

                        const embed_choose_gare = new MessageEmbed()
                            .setTitle('Réponse à la recherche d\'un trajet', message.author.displayAvatarURL)
                            .setTitle('Gare(s) correspondant à votre demande')
                            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                            .setTimestamp()
            
                        const gares = response.data.places.filter(place => place.administrative_region === undefined);

                        if (gares.length === 0) {
                            const embed_nodata = new MessageEmbed()
                                .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                                .setTitle(`Aucune gare ne correspond à cette demande.`)
                                .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                                .setTimestamp()
                            
                            return message.channel.send(embed_nodata);
                        }
            
                        gares.forEach((place, i) => {
                            embed_choose_gare.addField(parseInt(i) + parseInt(1), place.stop_area.label)
                        });
            
                        message.channel.send(embed_choose_gare);
            
                        const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1 });
                        
                        collector.on('collect', answer => {
                            if (gares[answer.content - 1] === undefined) {
                                const embed_nodata = new MessageEmbed()
                                    .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                                    .setTitle(`Réponse invalide.`)
                                    .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                                    .setTimestamp()
                                
                                return message.channel.send(embed_nodata);
                            }

                            gare2 = gares[answer.content - 1].stop_area.id;

                            axios.get(`https://api.sncf.com/v1/coverage/sncf/journeys/?from=${gare1}&to=${gare2}&datetime=${date}T${time}00&data_freshness=realtime&key=bc4480bd-f865-4278-b0a4-76758f5263f4`)
                                .then(function (response) {
                                    if (!response.data.journeys) {
                                        const embed_nodata = new MessageEmbed()
                                            .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                                            .setTitle(`Aucun trajet ne correspond à cette demande.`)
                                            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                                            .setTimestamp()
                                        
                                        return message.channel.send(embed_nodata);
                                    }

                                    const sections = response.data.journeys[0].sections;

                                    const true_sections = response.data.journeys[0].sections.filter(section => section.display_informations != undefined || section.type === 'waiting');

                                    const waiting_sections = response.data.journeys[0].sections.filter(section => section.type === 'waiting');

                                    let nom_gare_1 = true_sections[0].from.stop_point.label;

                                    let nom_gare_2 = true_sections[Object.keys(true_sections).length - 1].to.stop_point.label;

                                    let waiting_duration = 0;

                                    waiting_sections.forEach(section => {
                                        waiting_duration = parseInt(waiting_duration) + parseInt(section.duration);
                                    });

                                    let disruptions = 0;

                                    true_sections.forEach(section => {
                                        if (section.display_informations) {
                                            section.display_informations.links.forEach(link => {
                                                if (link.type === 'disruption') {
                                                    disruptions = parseInt(disruptions) + parseInt(1);
                                                }
                                            });
                                        }
                                    });

                                    const embed_intro = new MessageEmbed()
                                        .setAuthor(`Réponse à la recherche d'un trajet de ${nom_gare_1} vers ${nom_gare_2}`, message.author.displayAvatarURL())
                                        .setTitle(`Intrdocution d'un trajet`)
                                        .setColor('92f200')
                                        .setDescription(`Trajet composé de ${Object.keys(true_sections).length} section(s)`)
                                        .addField('Départ', `Le ${response.data.journeys[0].departure_date_time[6]}${response.data.journeys[0].departure_date_time[7]}/${response.data.journeys[0].departure_date_time[4]}${response.data.journeys[0].departure_date_time[5]}/${response.data.journeys[0].departure_date_time[0]}${response.data.journeys[0].departure_date_time[1]}${response.data.journeys[0].departure_date_time[2]}${response.data.journeys[0].departure_date_time[3]} à ${response.data.journeys[0].departure_date_time[9]}${response.data.journeys[0].departure_date_time[10]}h${response.data.journeys[0].departure_date_time[11]}${response.data.journeys[0].departure_date_time[12]}`)
                                        .addField('Arrivée', `Le ${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[6]}${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[7]}/${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[4]}${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[5]}/${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[0]}${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[1]}${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[2]}${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[3]} à ${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[9]}${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[10]}h${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[11]}${response.data.journeys[0].sections[Object.keys(sections).length- 1].arrival_date_time[12]}`)
                                        .addField('Durée', `${Math.floor(response.data.journeys[0].durations.total / 3600)} heure(s) et ${Math.floor(response.data.journeys[0].durations.total % 3600 / 60)} minute(s)`)
                                        .addField('Dont', `${Math.floor(waiting_duration / 3600)} heure(s) et ${Math.floor(waiting_duration % 3600 / 60)} minute(s) d'attente`)
                                        .addField('Correspondance(s)', response.data.journeys[0].nb_transfers)
                                        .addField('Perturbation(s) sur ce trajet', disruptions)
                                        .addField('CO2 émis lors de ce trajet', `${response.data.journeys[0].co2_emission.value}${response.data.journeys[0].co2_emission.unit}`)
                                        .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                                        .setTimestamp()
                                    
                                    message.channel.send(embed_intro);

                                    const nb = 1;
                                    const pages = true_sections.length;
                                    
                                    message.channel.send('** **')
                                        .then(to_edit => {
                                            embed(nb, to_edit);
                                        });

                                    function embed(nb, to_edit) {
                                        const section = true_sections[nb - 1];

                                        if (section.type != 'waiting') {
                                            let disruptions = 0;

                                            section.display_informations.links.forEach(link => {
                                                if (link.type === 'disruption') {
                                                    disruptions = parseInt(disruptions) + parseInt(1);
                                                }
                                            });

                                            let color;

                                            if (section.display_informations != undefined) {
                                                switch (section.display_informations.commercial_mode) {
                                                    case 'TGV INOUI':
                                                        color = '#930c37';
                                                    break;

                                                    case 'OUIGO':
                                                        color = '#00a0d0';
                                                    break;

                                                    case 'TER':
                                                        color = '#0a4b9e';
                                                    break;

                                                    default:
                                                        color = section.display_informations.color;
                                                    break;
                                                }
                                            }

                                            if (!section.from.stop_point) {
                                                if (!section.to.stop_point) {
                                                    const embed_sections = new MessageEmbed()
                                                        .setAuthor(`Réponse à la recherche d'un trajet de ${nom_gare_1} vers ${nom_gare_2}`, message.author.displayAvatarURL())
                                                        .setTitle(`Section ${nb}`)
                                                        .setColor(section.display_informations.color)
                                                        .addField('Numéro de train', section.display_informations.trip_short_name)
                                                        .addField('Type de train', section.display_informations.commercial_mode)
                                                        .addField('Point de départ', `${section.from.stop_area.name} (${section.from.stop_area.label})`)
                                                        .addField('Départ', `Le ${section.departure_date_time[6]}${section.departure_date_time[7]}/${section.departure_date_time[4]}${section.departure_date_time[5]}/${section.departure_date_time[0]}${section.departure_date_time[1]}${section.departure_date_time[2]}${section.departure_date_time[3]} à ${section.departure_date_time[9]}${section.departure_date_time[10]}h${section.departure_date_time[11]}${section.departure_date_time[12]}`)
                                                        .addField('Point d\'arrivée', `${section.to.stop_area.name} (${section.to.stop_area.label})`)
                                                        .addField('Arrivée', `Le ${section.arrival_date_time[6]}${section.arrival_date_time[7]}/${section.arrival_date_time[4]}${section.arrival_date_time[5]}/${section.arrival_date_time[0]}${section.arrival_date_time[1]}${section.arrival_date_time[2]}${section.arrival_date_time[3]} à ${section.arrival_date_time[9]}${section.arrival_date_time[10]}h${section.arrival_date_time[11]}${section.arrival_date_time[12]}`)
                                                        .addField('Durée', `${Math.floor(section.duration / 3600)} heure(s) et ${Math.floor(section.duration % 3600 / 60)} minute(s)`)
                                                        .addField('Perturbation(s) sur cette section', disruptions)
                                                        .addField('CO2 émis lors de ce trajet', `${section.co2_emission.value}${section.co2_emission.unit}`)
                                                        .setFooter(`SNCF Bot, un bot signé LProgead. | Page ${nb}/${pages}`, client.user.displayAvatarURL(), client.user.displayAvatarURL())
                                                        .setTimestamp()
                                                    
                                                    to_edit.edit(embed_sections)
                                                        .then(to_edit => {
                                                            to_edit.react('⬅️')
                                                                .then(() => {
                                                                    to_edit.react('➡️');

                                                                    const rcollector = new ReactionCollector(to_edit, r => r.message.id === to_edit.id && r.users.reaction.count === 2, { max: 1 });

                                                                    rcollector.on('collect', reaction => {
                                                                        switch (reaction.emoji.name) {
                                                                            case '⬅️':
                                                                                embed(nb - 1, to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('⬅️');
                                                                            break;

                                                                            case '➡️':
                                                                                embed(parseInt(nb) + parseInt(1), to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('➡️');
                                                                            break;
                                                                        }
                                                                    });
                                                                });
                                                        });
                                                } else {
                                                    const embed_sections = new MessageEmbed()
                                                        .setAuthor(`Réponse à la recherche d'un trajet de ${nom_gare_1} vers ${nom_gare_2}`, message.author.displayAvatarURL())
                                                        .setTitle(`Section ${nb}`)
                                                        .setColor(section.display_informations.color)
                                                        .addField('Numéro de train', section.display_informations.trip_short_name)
                                                        .addField('Type de train', section.display_informations.commercial_mode)
                                                        .addField('Point de départ', `${section.from.stop_area.name} (${section.from.stop_area.label})`)
                                                        .addField('Départ', `Le ${section.departure_date_time[6]}${section.departure_date_time[7]}/${section.departure_date_time[4]}${section.departure_date_time[5]}/${section.departure_date_time[0]}${section.departure_date_time[1]}${section.departure_date_time[2]}${section.departure_date_time[3]} à ${section.departure_date_time[9]}${section.departure_date_time[10]}h${section.departure_date_time[11]}${section.departure_date_time[12]}`)
                                                        .addField('Point d\'arrivée', `${section.to.stop_point.name} (${section.to.stop_point.label})`)
                                                        .addField('Arrivée', `Le ${section.arrival_date_time[6]}${section.arrival_date_time[7]}/${section.arrival_date_time[4]}${section.arrival_date_time[5]}/${section.arrival_date_time[0]}${section.arrival_date_time[1]}${section.arrival_date_time[2]}${section.arrival_date_time[3]} à ${section.arrival_date_time[9]}${section.arrival_date_time[10]}h${section.arrival_date_time[11]}${section.arrival_date_time[12]}`)
                                                        .addField('Durée', `${Math.floor(section.duration / 3600)} heure(s) et ${Math.floor(section.duration % 3600 / 60)} minute(s)`)
                                                        .addField('Perturbation(s) sur cette section', disruptions)
                                                        .addField('CO2 émis lors de ce trajet', `${section.co2_emission.value}${section.co2_emission.unit}`)
                                                        .setFooter(`SNCF Bot, un bot signé LProgead. | Page ${nb}/${pages}`, client.user.displayAvatarURL())
                                                        .setTimestamp()

                                                    to_edit.edit(embed_sections)
                                                        .then(to_edit => {
                                                            to_edit.react('⬅️')
                                                                .then(() => {
                                                                    to_edit.react('➡️');

                                                                    const rcollector = new ReactionCollector(to_edit, r => r.message.id === to_edit.id && r.users.reaction.count === 2, { max: 1 });

                                                                    rcollector.on('collect', reaction => {
                                                                        switch (reaction.emoji.name) {
                                                                            case '⬅️':
                                                                                embed(nb - 1, to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('⬅️');
                                                                            break;

                                                                            case '➡️':
                                                                                embed(parseInt(nb) + parseInt(1), to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('➡️');
                                                                            break;
                                                                        }
                                                                    });
                                                                });
                                                        });
                                                }
                                            } else {
                                                if (!section.to.stop_point) {
                                                    const embed_sections = new MessageEmbed()
                                                        .setAuthor(`Réponse à la recherche d'un trajet de ${nom_gare_1} vers ${nom_gare_2}`, message.author.displayAvatarURL())
                                                        .setTitle(`Section ${nb}`)
                                                        .setColor(section.display_informations.color)
                                                        .addField('Numéro de train', section.display_informations.trip_short_name)
                                                        .addField('Type de train', section.display_informations.commercial_mode)
                                                        .addField('Point de départ', `${section.from.stop_point.name} (${section.from.stop_point.label})`)
                                                        .addField('Départ', `Le ${section.departure_date_time[6]}${section.departure_date_time[7]}/${section.departure_date_time[4]}${section.departure_date_time[5]}/${section.departure_date_time[0]}${section.departure_date_time[1]}${section.departure_date_time[2]}${section.departure_date_time[3]} à ${section.departure_date_time[9]}${section.departure_date_time[10]}h${section.departure_date_time[11]}${section.departure_date_time[12]}`)
                                                        .addField('Point d\'arrivée', `${section.to.stop_area.name} (${section.to.stop_area.label})`)
                                                        .addField('Arrivée', `Le ${section.arrival_date_time[6]}${section.arrival_date_time[7]}/${section.arrival_date_time[4]}${section.arrival_date_time[5]}/${section.arrival_date_time[0]}${section.arrival_date_time[1]}${section.arrival_date_time[2]}${section.arrival_date_time[3]} à ${section.arrival_date_time[9]}${section.arrival_date_time[10]}h${section.arrival_date_time[11]}${section.arrival_date_time[12]}`)
                                                        .addField('Perturbation(s) sur cette section', disruptions)
                                                        .addField('Durée', `${Math.floor(section.duration / 3600)} heure(s) et ${Math.floor(section.duration % 3600 / 60)} minute(s)`)
                                                        .addField('CO2 émis lors de ce trajet', `${section.co2_emission.value}${section.co2_emission.unit}`)
                                                        .setFooter(`SNCF Bot, un bot signé LProgead. | Page ${nb}/${pages}`, client.user.displayAvatarURL())
                                                        .setTimestamp()

                                                    to_edit.edit(embed_sections)
                                                        .then(to_edit => {
                                                            to_edit.react('⬅️')
                                                                .then(() => {
                                                                    to_edit.react('➡️');

                                                                    const rcollector = new ReactionCollector(to_edit, r => r.message.id === to_edit.id && r.users.reaction.count === 2, { max: 1 });

                                                                    rcollector.on('collect', reaction => {
                                                                        switch (reaction.emoji.name) {
                                                                            case '⬅️':
                                                                                embed(nb - 1, to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('⬅️');
                                                                            break;

                                                                            case '➡️':
                                                                                embed(parseInt(nb) + parseInt(1), to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('➡️');
                                                                            break;
                                                                        }
                                                                    });
                                                                });
                                                        });
                                                } else {
                                                    const embed_sections = new MessageEmbed()
                                                        .setAuthor(`Réponse à la recherche d'un trajet de ${nom_gare_1} vers ${nom_gare_2}`, message.author.displayAvatarURL())
                                                        .setTitle(`Section ${nb}`)
                                                        .setColor(color)
                                                        .addField('Numéro de train', section.display_informations.trip_short_name)
                                                        .addField('Type de train', section.display_informations.commercial_mode)
                                                        .addField('Point de départ', `${section.from.stop_point.name} (${section.from.stop_point.label})`)
                                                        .addField('Départ', `Le ${section.departure_date_time[6]}${section.departure_date_time[7]}/${section.departure_date_time[4]}${section.departure_date_time[5]}/${section.departure_date_time[0]}${section.departure_date_time[1]}${section.departure_date_time[2]}${section.departure_date_time[3]} à ${section.departure_date_time[9]}${section.departure_date_time[10]}h${section.departure_date_time[11]}${section.departure_date_time[12]}`)
                                                        .addField('Point d\'arrivée', `${section.to.stop_point.name} (${section.to.stop_point.label})`)
                                                        .addField('Arrivée', `Le ${section.arrival_date_time[6]}${section.arrival_date_time[7]}/${section.arrival_date_time[4]}${section.arrival_date_time[5]}/${section.arrival_date_time[0]}${section.arrival_date_time[1]}${section.arrival_date_time[2]}${section.arrival_date_time[3]} à ${section.arrival_date_time[9]}${section.arrival_date_time[10]}h${section.arrival_date_time[11]}${section.arrival_date_time[12]}`)
                                                        .addField('Perturbation(s) sur cette section', disruptions)
                                                        .addField('Durée', `${Math.floor(section.duration / 3600)} heure(s) et ${Math.floor(section.duration % 3600 / 60)} minute(s)`)
                                                        .addField('CO2 émis lors de ce trajet', `${section.co2_emission.value}${section.co2_emission.unit}`)
                                                        .setFooter(`SNCF Bot, un bot signé LProgead. | Page ${nb}/${pages}`, client.user.displayAvatarURL())
                                                        .setTimestamp()

                                                    to_edit.edit(embed_sections)
                                                        .then(to_edit => {
                                                            to_edit.react('⬅️')
                                                                .then(() => {
                                                                    to_edit.react('➡️');

                                                                    const rcollector = new ReactionCollector(to_edit, r => r.message.id === to_edit.id && r.users.reaction.count === 2, { max: 1 });

                                                                    rcollector.on('collect', reaction => {
                                                                        switch (reaction.emoji.name) {
                                                                            case '⬅️':
                                                                                embed(nb - 1, to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('⬅️');
                                                                            break;

                                                                            case '➡️':
                                                                                embed(parseInt(nb) + parseInt(1), to_edit);
                                                                                reaction.remove();
                                                                                to_edit.react('➡️');
                                                                            break;
                                                                        }
                                                                    });
                                                                });
                                                        });
                                                }
                                            }
                                        } else {
                                            const embed_sections = new MessageEmbed()
                                                .setAuthor(`Réponse à la recherche d'un trajet de ${nom_gare_1} vers ${nom_gare_2}`, message.author.displayAvatarURL())
                                                .setTitle(`Section ${nb} | Attente`)
                                                .setColor('#FF2200')
                                                .addField('Durée', `${Math.floor(section.duration / 3600)} heure(s) et ${Math.floor(section.duration % 3600 / 60)} minute(s)`)
                                                .setFooter(`SNCF Bot, un bot signé LProgead. | Page ${nb}/${pages}`, client.user.displayAvatarURL())
                                                .setTimestamp()

                                            to_edit.edit(embed_sections)
                                                .then(to_edit => {
                                                    to_edit.react('⬅️')
                                                        .then(() => {
                                                            to_edit.react('➡️');

                                                            const rcollector = new ReactionCollector(to_edit, r => r.message.id === to_edit.id && r.users.reaction.count === 2, { max: 1 });

                                                            rcollector.on('collect', reaction => {
                                                                switch (reaction.emoji.name) {
                                                                    case '⬅️':
                                                                        embed(nb - 1, to_edit);
                                                                        reaction.remove();
                                                                        to_edit.react('⬅️');
                                                                    break;

                                                                    case '➡️':
                                                                        embed(parseInt(nb) + parseInt(1), to_edit);
                                                                        reaction.remove();
                                                                        to_edit.react('➡️');
                                                                    break;
                                                                }
                                                            });
                                                        });
                                                });
                                        }
                                    }
                                })
                                .catch(err => {
                                    if (err.response) {
                                        if (err.response.status === 404) {
                                            const embed_nodata = new MessageEmbed()
                                                .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                                                .setTitle(`Aucun trajet ne correspond à cette demande.`)
                                                .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                                                .setTimestamp()
                                            
                                            return message.channel.send(embed_nodata);
                                        }

                                        if (err.response.data.message === 'your origin and destination points are the same') {
                                            const embed_same = new MessageEmbed()
                                                .setAuthor(`Réponse à la recherche d'un trajet`, message.author.displayAvatarURL())
                                                .setTitle(`Votre gare d'arrivée et de départ ne peuvent être les mêmes.`)
                                                .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
                                                .setTimestamp()

                                            return message.channel.send(embed_same);
                                        }
                                    } else {
                                        console.log(err)
                                    }                               
                                });
                        });
                    });
            });
        });
}
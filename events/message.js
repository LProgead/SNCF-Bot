module.exports = (client, message) => {
    const { MessageEmbed } = require('discord.js');

    if (message.author.bot) return;

    const args = message.content.replace('sncf.', '').split(' ');
    const command = args[0];

    if (message.content === '<@!771684716390645761>') {
        client.commands.get('help').run(client, message, args);
    }

    const prefix = "sncf.";
    if (!message.content.startsWith(prefix)) return;

    const cmd = client.commands.get(command);

    if (!cmd) {
        const noexist_cmd = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor('#FF2200')
            .setTitle('Commande inexistante')
            .setDescription('Vous avez tenté d\'exécuter une commande inexistante.')
            .setFooter('SNCF Bot, un bot signé LProgead.', client.user.displayAvatarURL())
            .setTimestamp()

        message.channel.send(noexist_cmd);
        return console.log(`L'utilisateur ${message.author.tag} a effectué la commande ${command} qui n'existe pas.`);
    }

    cmd.run(client, message, args);
};
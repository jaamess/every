const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    category: 'Utilidades',
    permissionLevel: 0,
    description: 'Lista todos os comandos com informações sobre cada um deles.',
    cooldown: 5,
    async execute(message, args, emojis) {
        const prefix = message.client.settings.get('prefix', 'prefix');
        const COMANDOS = [];
        const { commands } = message.client;

        if(!args.length) {
            /*COMANDOS.push(`Aqui está uma lista com todos os meus comandos:`);
            COMANDOS.push(commands.map(command => command.name).join(', '));
            COMANDOS.push(`Caso queira ajuda com um comando específico, use \`${prefix}help <nome do comando>\`!`);*/
            const helpEmbed = new MessageEmbed()
            .setAuthor(`Ajuda do Matty`, message.client.user.avatarURL({dynamic: true}))
            .setColor('RANDOM')
            .setTitle(`Lista com todos os comandos!`);
            commands.forEach(cmd => {
                helpEmbed.addField(`${prefix}${cmd.name}`, cmd.description, { inline: true});
            });

            return message.channel.send(helpEmbed);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) return message.channel.send(`${emojis.nao} | Esse comando não existe!`);

        COMANDOS.push(`**Comando:** ${command.name}`);

        if (command.description) COMANDOS.push(`**Descrição:** ${command.description}`);
        if (command.cooldown) COMANDOS.push(`**Cooldown:** ${command.cooldown} segundos`);

        return message.channel.send(COMANDOS, { split: true});

    }
}
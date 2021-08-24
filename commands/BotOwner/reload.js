const fs = require('fs');

module.exports = {
    name: 'reload',
    category: 'Owner',
    permissionLevel: 10,
    args: true,
    description: 'Recarrega um comando sem precisar reiniciar o bot.',
    execute(message, args, emojis) {
        if (message.author.id !== '295318635910529024') {
            return message.channel.send(`${emojis.nao} | Você não tem permissão para usar este comando.`)
        }
        /* 
        * RELOADING COMMANDS
        */
        const commandName = args[0];
        const command = message.client.commands.get(commandName);
        const eventName = commandName;
        const event = message.client.events.get(eventName);
        if (!command && !event) {
            return message.channel.send(`<a:nao_matty:831413088058081290>  | Não foi possível encontrar um comando ou evento com o nome ${commandName}!`);
        }

        if (command) {
        // Carregar novamente todos os comandos atuais do bot e checar onde o comando está
        const commandFolders = fs.readdirSync(`./commands`);
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

        // Deletar o comando de client.commands e requerer o arquivo novamente, removendo o arquivo anterior do cache do require()
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            return message.channel.send(`${emojis.sim} | Comando \`${newCommand.name}\` reiniciado com sucesso!`);
        } catch (error) {
            console.error(error);
            return message.channel.send(`${emojis.nao} | Houve um erro ao reiniciar o comando \`${command.name}\`:\n\`${error.message}\``);
        }
        } else if (event) {
            const eventFolders = fs.readdirSync(`C:/Users/thiag/Documents/Coding/Matty/Matty/events`);
            const folderName = eventFolders.find(folder => fs.readdirSync(`C:/Users/thiag/Documents/Coding/Matty/Matty/events/${folder}`).includes(`${eventName}.js`));
            delete require.cache[require.resolve(`../${folderName}/${event.name}.js`)];

            try {
                const newEvent = require(`${eventFolders}/${event.name}.js`);
                message.client.commands.set(newEvent.name, newEvent);
                return message.channel.send(`${emojis.sim} | Evento \`${newEvent.name}\` reiniciado com sucesso!`);
            } catch (error) {
                console.error(error);
                return message.channel.send(`${emojis.nao} | Houve um erro ao reiniciar o evento \`${event.name}\`:\n\`${error.message}\``);
            }
        }
    }
}
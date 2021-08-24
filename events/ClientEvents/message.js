module.exports = {
    name: 'message',
    once: false,
    execute(message, client, emojis, Discord) {
        const prefix = message.client.settings.get('prefix', 'prefix');
        if (message.author.bot || !message.content.startsWith(prefix)) return;
        // Definindo argumentos e separando o nome do comando
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        // Se o comando não existe, cancelar
        if (!client.commands.has(commandName)) return;
        // Definit o comando em si, e checar se tem os argumentos necessários pra execução
        const command = client.commands.get(commandName);
        if (command.guildOnly && message.channel.type === 'dm') return;
        if (command.args && !args.length) {
            return message.channel.send(`${emojis.nao}  **| Você não enviou o comando completo, tente novamente.**`);
        }
        
        // Lidando com cooldowns (evitar flood do bot)
        client.cooldowns = new Discord.Collection();
        const { cooldowns } = client;
    
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
    
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`${emojis.nao}  | Por favor, espere ${timeLeft.toFixed(1)} segundo(s) antes de executar este comando novamente.`)
            }
        }
        // Caso o usuário possa usar o comando, deletar ele após o tempo de cooldown ter expirado
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
    
    
    
        try {
            command.execute(message, args, emojis)
        } catch(error) {
            console.error(error);
            return message.reply(`${emojis.nao} | Houve um erro ao executar esse comando. Mais detalhes no console.`);
        }
    }
}
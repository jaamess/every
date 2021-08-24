module.exports = {
    name: 'ping',
    args: false,
    description: 'Ping!',
    execute(message, args, emojis) {
        message.channel.send(`🏓 | Ping! A latência para enviar e receber mensagens é de: ${Date.now() - message.createdTimestamp}ms!\n🏓 | Pong! A latência da API do Discord é de: ${Math.round(message.client.ws.ping)}ms.`);
    },
};
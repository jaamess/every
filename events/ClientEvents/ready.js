module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot carregado. Servindo ${client.guilds.cache.size > 1 ? 'servidores.' : 'servidor.'}`);
    }
}
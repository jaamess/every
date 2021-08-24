module.exports = {
    name: 'join',
    category: 'Música',
    permissionLevel: 0,
    args: false,
    guildOnly: true,
    cooldown: 10,
    description: 'Entra no seu canal de voz atual',
    async execute(message, args, emojis) {
        if (!message.member.voice.channel) {
            return message.channel.send(`${emojis.nao} | Você precisa estar em um canal de voz para executar esse commando!`);
        }
        await message.member.voice.channel.join();
        return message.channel.send(`${emojis.sim} | Eu entrei no canal de voz ${message.member.voice.channel.name}.`)
    }
}
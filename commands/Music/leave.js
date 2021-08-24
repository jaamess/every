module.exports = {
    name: 'leave',
    category: 'Música',
    permissionLevel: 0,
    args: false,
    guildOnly: true,
    cooldown: 3,
    description: 'Sai do seu canal de voz atual',
    async execute(message, args, emojis) {
        if (!message.member.voice.channel) {
            return message.channel.send(`${emojis.nao} | Você precisa estar em um canal de voz para executar esse commando!`);
        }
        await message.member.voice.channel.leave();
        return message.channel.send(`${emojis.sim} | Eu saí do canal de voz ${message.member.voice.channel.name}. Você pode me convidar de novo com o comando \`;join\` ou escolhendo uma nova música!`)
    }
}
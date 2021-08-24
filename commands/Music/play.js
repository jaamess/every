const ytdl = require('ytdl-core');
const config = require('../../config.json');
module.exports = {
    name: 'play',
    category: 'Música',
    permissionLevel: 0,
    args: true,
    guildOnly: true,
    cooldown: 3,
    description: 'Toca uma música que você escolher, por nome ou link do Youtube.',
    async execute(message, args, emojis) {
        // Só executamos esse comando se o usuário estiver na call.
        if (!message.member.voice.channel) {
            return message.channel.send(`${emojis.nao} | Você precisa estar em um canal de voz para executar esse commando!`);
        }
        const request = args.join(' ');

        // Tocar música se for uma URL válida do Youtube
        if(checkURL(request)) {
        return play(request);
        } else {
            const requestIsURL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
            if (requestIsURL.test(request)) {
                return message.channel.send(`${emojis.nao} | Você precisa enviar um link válido do Youtube ou um termo de pesquisa!`);
            }
            const search = require('youtube-search');
            const options = {
                maxResults: 1,
                key: config.youtubeKey
            }
            search(request, options, function(err, results) {
                if(err) {
                    message.channel.send(`${emojis.nao} | Houve um erro ao buscar este termo no Youtube. Tente novamente.`);
                    return console.log(err);
                }
                const videoURL = results[0].link;
                return play(videoURL);
            })
        }

        // Checar se é uma URL do Youtube
        function checkURL(request) {
            const URL = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
            if (URL.test(request)) return true
        }

        // Tocar a música
        async function play(song) {
            const connection = await message.member.voice.channel.join();
            const dispatcher = await connection.play(ytdl(song, { quality: 'highestaudio'}), { volume: 0.5});
            const videoInfo = await ytdl.getBasicInfo(song);
            const info = {
                title: videoInfo.videoDetails.title,
                owner: videoInfo.videoDetails.ownerChannelName
            }
            return message.channel.send(`${emojis.sim} | Agora tocando: ${info.title} de ${info.owner}`);
        }
    }
}
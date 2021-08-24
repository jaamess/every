const musicSettings = require('../../database/db');
module.exports = {
    name: 'eval',
    category: 'Owner',
    permissionLevel: 10,
    description: 'Evaluates arbitrary Javascript',
    guildOnly: false,
    args: true,
    cooldown: 1,
    async execute(message, args, emojis) {
        const prefix = message.client.settings.get('prefix', 'prefix');
        const clean = text => {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
        if (message.author.id === '295318635910529024'|| message.author.id === '749786707561414747') {
            if (message.content.startsWith(prefix)) {
                const expression = message.content.split(' ').slice(1).join(' ')
                try {
                    let evaled = await eval(expression);
                    if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
        
                    message.channel.send(`\`RESULTADO\`\n \`\`\`js\n${clean(evaled)}\n\`\`\``, { split: true});
                    console.log(`${message.author.username} executou um código: ${expression}`);
                } catch (err) {
                    console.log(`${message.author.username} executou um código: ${expression}`);
                    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
                }
            }
        }
    }

}
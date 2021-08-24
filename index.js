// Loading dependencies
const Enmap = require('enmap');
const fs = require('fs');
const config = require('./config.json');
const emojis = config.emojis;
//Discord client instance
const Discord = require('discord.js');
const client = new Discord.Client();

// Carregar todos os EventEmitters
// Events collection
client.events = new Discord.Collection();
const eventFolders = fs.readdirSync('./events');
for (const folder of eventFolders) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${folder}/${file}`);
        client.events.set(event.name, event);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client, emojis, Discord));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, emojis, Discord));
        }
    }
}


// Carregar todos os arquivos de comandos nas sub-pastas
// Commands collection
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Iniciar as configurações do servidor
client.settings = new Enmap({
    name: 'settings',
    fetchAll: true,
    autoFetch: true,
    cloneLevel: 'deep',
    autoEnsure: {
        prefix: ';'
    }
});

client.login(config.token);
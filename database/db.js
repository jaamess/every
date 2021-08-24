const Enmap = require("enmap");

module.exports = {
    queue: new Enmap({
        name: 'queue',
        autoFetch: true,
    }),
    getQueue: (guild) => {
        return this.queue.find(q => q.guild.id === guild.id);
    }
};
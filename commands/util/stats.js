const snekfetch = require('snekfetch');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const prettyMilliseconds = require("pretty-ms");
const package = require('../../package.json');

module.exports = {
    name: 'stats',
    category: 'util',
    description: 'Connect to the cBot private API and get data.',
    execute(message) {
        const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
        const { commands } = message.client;
        snekfetch.get(`http://127.0.0.1/info`).then(r => {
            var string = JSON.stringify(r.body);
            const embed = new MessageEmbed()
                .setColor('#c94238')
                .setAuthor(`cBot`, message.client.user.displayAvatarURL({ dynamic: true, type: 'png' }))
                .setThumbnail(message.client.user.displayAvatarURL({ type: 'png' }))
                .addField('Developer informations', `consty#9468\napi: ${Math.round(message.client.ws.ping)}ms\nproduction: ${package.production}`, true)
                .addField('Language', `packages: ${Object.keys(package.dependencies).length}\nnode ${process.version.match(/^v(\d+\.\d+)/)[1]}\ndiscord.js ${require('discord.js').version}\nsnekfetch ${package.dependencies.snekfetch.replace('^', '')}\n${package.name} ${package.version}`, false)
                .addField('Status', `users: ${r.body.users}\nguilds: ${r.body.guilds}\nram: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}mb\nuptime: ${prettyMilliseconds(message.client.uptime)}\ncommands: ${commands.size}\nstatus: ${message.client.presence.status}\ncategories: ${getDirectories('./commands').length}`, true)
                .addField('Support', `support server: n-avem\nsocial media: tot n-avem\ngithub: not public yet\nshards: 0\npowered by: npmjs.com\nlicense: ${package.license}`, false)
                .setFooter(`requested by ${message.author.username} | action time: ${new Date(Date.now()).toString().substr(4, 17)}`)
            message.channel.send(embed)
        })
    }
}
const Discord = require('discord.js');
const pagination = require('discord.js-pagination');
const fs = require('fs');
module.exports = {
    name: 'help',
    description: 'List of all commands available.',
    category: 'util',
    aliases: ['cmds', 'commands', 'info'],
    execute(message) {
        const { commands } = message.client;
        const page1 = new Discord.MessageEmbed()
            .setColor('#c94238')
            .setAuthor(`Util commands`, message.client.user.displayAvatarURL({ dynamic: true, type: 'png' }))
            .setDescription(`${commands.filter(c => c.category === 'util').map(command => `**${command.name}** - ${command.description || 'no description available'} [${command.aliases || 'no aliases'}]`).join(`\n `)}`)
        
        const page2 = new Discord.MessageEmbed()
            .setColor('#c94238')
            .setAuthor(`Fun commands`, message.client.user.displayAvatarURL({ dynamic: true, type: 'png' }))
            .setDescription(`${commands.filter(c => c.category === 'fun').map(command => `**${command.name}** - ${command.description || 'no description available'} [${command.aliases || 'no aliases'}]`).join(`\n `)}`)

        const page3 = new Discord.MessageEmbed()
            .setColor('#c94238')
            .setAuthor(`Moderation commands`, message.client.user.displayAvatarURL({ dynamic: true, type: 'png' }))
            .setDescription(`${commands.filter(c => c.category === 'mod').map(command => `**${command.name}** - ${command.description || 'no description available'} [${command.aliases || 'no aliases'}]`).join(`\n `)}`)
        
        const pages = [
            page1,
            page2,
            page3
        ]
        const emoji = ["⬅️", "➡️"]
        const timeout = '100000'

        pagination(message, pages, emoji, timeout)
    }
}
const config = require('../../assets/config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'gay',
    category: 'fun',
    description: 'Get your gay level.',
    execute(message, args) {
        const member = message.mentions.users.first() || message.author;
        if(member.bot) return message.reply('bots are nonbinary.');

        let embed = new MessageEmbed()
            .setColor(config.theme.main)
            .setFooter(`action requested by ${message.author.username} | we support pride!`)
            .setThumbnail(`https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/1024px-Gay_Pride_Flag.svg.png`)
            .setDescription(`${member.username} is ${Math.floor(Math.random() * 100) + 1}% gay.`)
            .setAuthor(member.username, member.displayAvatarURL({ dynamic: true, type: 'png' }))
        message.channel.send(embed)
    }
}
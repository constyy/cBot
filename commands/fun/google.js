const { MessageEmbed } = require('discord.js');
const google = require('google-it')
module.exports = {
    name: 'google',
    category: 'fun',
    description: 'Search on Google by Discord.',
    execute(message, args) {
        try {
            const embed = new MessageEmbed()
                .setColor('#c94238')
                .setAuthor(message.client.user.username, message.client.user.displayAvatarURL({ dynamic: true, type: 'png' }))
                .setFooter(`requested by ${message.author.username} | action time: ${new Date(Date.now()).toString().substr(4, 17)}`)
            google({'query': args.join(" "), 'disableConsole': true, 'excludeSites': 'youtube.com'}).then(results => {
                results.forEach(function(item, index) { 
                    embed.addField((index + 1) + ". " + item.title, "<" + item.link + ">");
                });
        
            message.reply(embed);
             }).catch(e => {
               message.reply('query not found.');
            });
        } catch(e) {
            return message.reply(`request path contains unescaped characters.`);
        }
    }
}
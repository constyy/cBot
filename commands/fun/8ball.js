const Discord = require('discord.js')
module.exports = {
    name: '8ball',
    category: 'fun',
    description: 'Random replies displayed within this command.',
    execute(message, args) {
        if(!args.length) return message.reply('do you think I\'m Akinator? Can\'t guess your question.');
        if(!args.join(' ').includes('?')) return message.reply('this is not a question.');
        const embed = new Discord.MessageEmbed()
            .setColor('#c94238')
            .setAuthor(args.join(' '))
            .setDescription(`${ballrandom()}.`)
            .setFooter(`requested by ${message.author.username} | action time: ${new Date(Date.now()).toString().substr(4, 17)}`)
        message.channel.send(embed)
            
    }
}

function ballrandom() {
    var rand = ['Yes', 'Sure', 'Definetly', 'Probably', 'Maybe later', 'Try again', 'No', 'Probably not', 'Definetly not', 'Can you ask that again', 'sheesh'];
    return rand[Math.floor(Math.random()*rand.length)];
}
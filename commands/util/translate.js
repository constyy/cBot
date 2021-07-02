const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate');
module.exports = {
    name: 'translate',
    category: 'util',
    description: 'Translate things using google translate.',
    async execute(message, args) {
        if(!args.length) return message.reply('can\'t translate null.\ncorrect format: $translate ``lang`` ``content``');
        try {
            const translated = await translate(args.slice(1).join(" "), { to: `${args[0]}` });
            const embed = new Discord.MessageEmbed()
                .setColor('#c94238')
                .setAuthor(`cBot [translated to ${args[0]}]`, message.client.user.displayAvatarURL({ dynamic: true, type: 'png' }))
                .setDescription(`${translated.text}`)
                .setFooter(`requested by ${message.author.username} | action time: ${new Date(Date.now()).toString().substr(4, 17)}`)
            message.channel.send(embed)
        } catch(e) {
            console.log(e);
            return message.reply(`the language ${args[0]} isn\'t supported.`);
        }
    }
}
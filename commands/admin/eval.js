const config = require('../../assets/config.json');
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
module.exports = {
    name: 'eval',
    description: 'Run scripts through discord.',
    async execute(message, args) {
        if(!config.admins.includes(message.author.id)) return message.reply('you are not an admin.');
        if(!args.length) return;
        if(args.includes(`message.client.token`)) return message.reply('ce ai incercat cumetre');
        try {
            const result = await eval(args.join(" "));
            let output = result;
            if(typeof result !== 'string') output = inspect(result)
            const embed = new MessageEmbed()
			    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, type: 'png' }))
			    .setColor('#c94238')
                .setDescription(`\`\`\`js\n${output}\`\`\``)
            message.channel.send(embed)
        } catch(e) {
           return message.reply('too long to display');
        }
    }
}
const Discord = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	category: 'util',
	aliases: ['icon', 'pfp', 'av'],
	execute(message) {
		const user = message.mentions.users.first() || message.author;
		const embed = new Discord.MessageEmbed()
			.setAuthor(user.username, user.displayAvatarURL({ dynamic: true, type: 'png' }))
			.setColor('#c94238')
			.setDescription(`[WEBP](${user.displayAvatarURL({ dynamic: true, type: 'webm' })}) | [JPEG](${user.displayAvatarURL({ dynamic: true, type: 'JPEG' })}) | [PNG](${user.displayAvatarURL({ dynamic: true, type: 'png' })})`)
			.setImage(`${user.displayAvatarURL({ dynamic: true, type: 'png', size: 512 })}`)
		message.channel.send(embed);
	},
};
const config = require('../../assets/config.json');
const fs = require('fs');
module.exports = {
    name: 'refresh',
    description: 'Refresh index.js.',
    execute(message, args) {
        if(!config.admins.includes(message.author.id)) return message.reply('you are not an admin.');
        delete require.cache[require.resolve(`../../index.js`)];

		try {
			message.reply(`\`index.js\` has been successfully loaded.`);
		} catch (error) {
			console.error(error);
			message.reply('error! If the error persists, contact __consty#9468__.').then(msg => { msg.delete({ timeout: 10000 }) });
		}
    }
}
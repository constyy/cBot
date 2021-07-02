const config = require('../../assets/config.json');
const fs = require('fs');
module.exports = {
    name: 'reload',
    description: 'Reload specified commands.',
    execute(message, args) {
        if(!config.admins.includes(message.author.id)) return message.reply('you are not an admin.');
		const command = message.client.commands.get(args[0].toLowerCase()) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));

		if (!command) return message.reply(`\`${args[0].toLowerCase()}\` doesn't exist.`);

        const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.reply(`\`${newCommand.name}\` has been successfully loaded.`);
		} catch (error) {
			console.error(error);
			message.reply('error! If the error persists, contact __consty#9468__.').then(msg => { msg.delete({ timeout: 10000 }) });
		}
    }
}
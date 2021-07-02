const config = require('../../assets/config.json');
let fs = require('fs');
module.exports = {
    name: 'add',
    description: 'Create new owner.',
    execute(message, args) {
        if(!config.admins.includes(message.author.id)) return message.reply('you are not an admin.');
        try {
            config.admins.push(`${args[0]}`);
            fs.writeFileSync('./assets/config.json', JSON.stringify(config, null, 4));
            message.reply(`you added \`${args[0]}\` to the admins list.`);
        } catch(e) {
            console.error(e);
        }
    }
}
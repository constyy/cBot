const fs = require('fs');
const config = require('../../assets/config.json');
const package = JSON.parse(fs.readFileSync('./package.json'));
const f = require('../../index');
module.exports = {
    name: 'version',
    description: 'Modify bot version.',
    execute(message, args) {
        if(!config.admins.includes(message.author.id)) return message.reply('you are not an admin.');
        if(!args.length) return;
        try {
            package.version = `${args[0]}`;
            fs.writeFileSync('./package.json', JSON.stringify(package, null, 4));
            f.updatePresence();
            message.reply(`changed the current version to \`${args[0]}\`.`);
        } catch(e) {
            console.error(e);
        }
    }
}
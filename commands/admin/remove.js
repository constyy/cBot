const config = require('../../assets/config.json');
let fs = require('fs');
module.exports = {
    name: 'remove',
    description: 'Remove an owner.',
    execute(message, args) {
        if(!config.admins.includes(message.author.id)) return message.reply('you are not an admin.');
        try{
            const idx = config.admins.findIndex(str => str === args[0]);
            config.admins.splice(idx, 1); 
            fs.writeFileSync('./assets/config.json', JSON.stringify(config, null, 4));
            message.reply(`you removed \`${args[0]}\` from the admins list.`);
        } catch(err) {
            console.log(err);
        }
    }
}
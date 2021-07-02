const config = require('../../assets/config.json');
module.exports = {
    name: 'say',
    category: 'fun',
    description: 'Send messages by the bot.',
    execute(message, args) {
        if(!config.admins.includes(message.author.id)) return message.reply('you are not an admin.');
        if(args.join(" ").includes(`bot.token` || `client.token` || `token`)) return;
        try {
            message.delete();
           return message.channel.send(args.join(" "));
        } catch(e) {
            console.error(e);
        }
    }
}
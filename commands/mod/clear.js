module.exports = {
    name: 'purge',
    category: 'mod',
    description: 'Bulk clear messages',
    aliases: ['clear', 'clean', 'delete'],
    execute(message, args) {
        if(isNaN(args[0])) return message.reply('incorrect input.');
        try {
            if(args[0] > 100) args[0] = 100
            message.channel.bulkDelete(args[0], true);
            message.reply(`successfully deleted ${args[0]} messages.`);
        } catch(e) {
            return message.reply(`request path contains unescaped characters.`);
        }
    }
}
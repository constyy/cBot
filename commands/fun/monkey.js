const config = require('../../assets/config.json');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'monkey',
    category: 'fun',
    description: 'Random monkey images.',
    execute(message, args) {
        try {
            fetch.default(`https://api.monkedev.com/attachments/monkey`).then(res => res.json()).then(data => { message.channel.send(data.url) })
        } catch(e) {
            return message.reply(`request path contains unescaped characters.`);
        }
    }
}
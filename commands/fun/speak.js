const config = require('../../assets/config.json');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'speak',
    category: 'fun',
    description: 'Speak with an AI.',
    execute(message, args) {
        try {
            fetch.default(`https://api.monkedev.com/fun/chat?msg=${args.join(" ")}&uid=${message.author.id}`).then(res => res.json()).then(data => { message.channel.send(data.response) })
        } catch(e) {
            return message.reply(`request path contains unescaped characters.`);
        }
    }
}
const config = require('../../assets/config.json');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
module.exports = {
    name: 'reverse',
    category: 'fun',
    description: 'Reverses your text.',
    execute(message, args) {
        try {
            fetch.default(`https://api.monkedev.com/fun/reverse?content=${args.join(" ")}`).then(res => res.json()).then(data => { message.channel.send(data.result) })
        } catch(e) {
            return message.reply(`request path contains unescaped characters.`);
        }
    }
}
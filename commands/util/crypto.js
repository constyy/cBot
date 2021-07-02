const axios = require('axios');
const config = require('../../assets/config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'crypto',
    	category: 'util',
    description: 'Use a crypto API to bring datas about your favourite coin.',
    async execute(message, args) {
        if(!args.length) return message.reply('you must provide a crypto coin (short ones work better).');
        if(args.length === 1) url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?CMC_PRO_API_KEY=${config.apis.crypto}&symbol=${args[0]}`;
        try {
            message.channel.startTyping(true)
            const result = await axios.get(url);
            const data = result.data.data[args[0].toUpperCase()];

            let embed = new MessageEmbed()
                .setTitle(`Search query: \`\`${args[0].toUpperCase()}\`\``)             
                .setColor('#c94238')
                .setDescription(`1 ${data.name} [${data.symbol}] costs ${Math.round(data.quote.USD.price).toLocaleString()}$\n1h change: ${data.quote.USD.percent_change_1h.toFixed(2)}%\n24h change: ${data.quote.USD.percent_change_24h.toFixed(2)}%\n7d change: ${data.quote.USD.percent_change_7d.toFixed(2)}%`)
                .setFooter(`requested by ${message.author.username} | action time: ${new Date(Date.now()).toString().substr(4, 17)}`)
            message.channel.send(embed)
            message.channel.stopTyping(true)
        } catch(err) {
            message.channel.stopTyping(true)
            console.error(err)
            return message.reply('something didn\'t work as planned.');
        }
    }
}
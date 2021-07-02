const https = require('https');
const Discord = require('discord.js');
const url = 'https://www.reddit.com/r/meme/hot/.json?limit=100'

module.exports = {
    name: 'meme',
    category: 'fun',
    description: 'Find memes using Reddit through Discord.',
    aliases: ['funny', 'reddit', 'memes'],
    execute(message) {
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * 99) + 1].data

                var image = index.preview.images[0].source.url.replace('&amp;', '&')
                var subRedditName = index.subreddit_name_prefixed

                const imageembed = new Discord.MessageEmbed()
                    .setAuthor(subRedditName)
                    .setImage(image)
                    .setColor('#c94238')
                    .setURL(`https://reddit.com/${subRedditName}`)
                message.reply('wait..').then(msg => { msg.edit(imageembed) });
            }).on('error', function (e) {
                console.error(e)
            })
        })
    }
}
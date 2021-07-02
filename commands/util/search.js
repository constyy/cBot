const discord = require('discord.js');
const client = new discord.Client();
const {MessageButton, MessageActionRow} = require('discord.js-buttons')(client);

const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyCyWHFk_oRIHFXqNxrRWjrT1IBX9-riECQ');
module.exports = {
	name: 'search',
    category: 'util',
	description: 'Search videos via YouTube.',
    aliases: ['yt', 'youtube', 'video'],
	execute(message, args) {
        const DateNow = Date.now();
        if(!args.length) return;
        youtube.searchVideos(args, 5)
        .then(results => {
            let button = new MessageButton()
            .setStyle('url') 
            .setLabel(results[0].title.substring(0, 80)) 
            .setURL(results[0].url)

            let button1 = new MessageButton()
            .setStyle('url') 
            .setLabel(results[1].title.substring(0, 80)) 
            .setURL(results[1].url)

            let button2 = new MessageButton()
            .setStyle('url') 
            .setLabel(results[2].title.substring(0, 80)) 
            .setURL(results[2].url)

            let button3 = new MessageButton()
            .setStyle('url') 
            .setLabel(results[3].title.substring(0, 80)) 
            .setURL(results[3].url)

            let button4 = new MessageButton()
            .setStyle('url') 
            .setLabel(results[4].title.substring(0, 80)) 
            .setURL(results[4].url)

            let embed = new discord.MessageEmbed()
                .setTitle(`Search query: \`\`${args.join(" ")}\`\``)             
                .setColor('#c94238')
                .setDescription(':warning: Note that this message will be deleted in 1 minute after the command has been executed & only the first five results are shown.\nIf you want to access the URL from the video below, please click one of the buttons for getting redirected to the YouTube video.')
                .setFooter(`requested by ${message.author.username} | action time: ${new Date(DateNow).toString().substr(4, 17)}`)

            message.channel.send({ embed: embed, buttons: [ button, button1, button2, button3, button4 ] }).then(msg => {	msg.delete({ timeout: 60000 }) });
        })
        .catch(console.log);
	},
};
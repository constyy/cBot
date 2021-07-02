module.exports = {
	name: 'ping',
	category: 'util',
	description: 'Connect to Discord Gateway and grab ping informations.',
	execute(message) {
		message.channel.send('🏓 Pinging..').then(msg =>{ msg.edit(`🏁 Latency: ${msg.createdTimestamp - message.createdTimestamp}ms.\n🏁 API: ${Math.round(message.client.ws.ping)}ms`) })
	},
};
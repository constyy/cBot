module.exports = {
	name: 'ping',
	category: 'util',
	description: 'Connect to Discord Gateway and grab ping informations.',
	execute(message) {
		message.channel.send('š Pinging..').then(msg =>{ msg.edit(`š Latency: ${msg.createdTimestamp - message.createdTimestamp}ms.\nš API: ${Math.round(message.client.ws.ping)}ms`) })
	},
};
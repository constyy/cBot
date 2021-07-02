//MAIN
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./assets/config.json');
const package = require('./package.json');
const bot = new Discord.Client();
const prettyMilliseconds = require("pretty-ms");

// API
const http = require("http");


// CMD HANDLER + TIMER
const talkedRecently = new Set();
bot.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		bot.commands.set(command.name, command);
	}
}

// api listener
var server = http.createServer(function (req, res) {
    if(req.url == '/info') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({ users: `${bot.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)}`, guilds: `${bot.guilds.cache.size}`, version: `${package.version}`, uptime: `${prettyMilliseconds(bot.uptime)}`, node: `${process.version.match(/^v(\d+\.\d+)/)[1]}` }));
        res.end();
    }
})

server.listen(config.apis.port, (err) => {
    if(err) return console.error(err);
    console.log(`[NOTE] api listening on ${config.apis.port}`)
})


// events
bot.on('ready', () => {
    console.log('[DEBUG] The bot connected to the Discord Gateway successfully.');
	switch (package.production) {
		case false:
			bot.user.setPresence({ activity: { name: `${package.version} [dev branch]`, type: 'WATCHING' } });
			console.log('[DEV] Connected to development mode.');
			break;
		case true:
			bot.user.setActivity(`${package.version}`, { type: 'WATCHING' });
			console.log('[DEV] Connected to production mode.');
			break;
	}
});

module.exports.updatePresence = function updatePresence() {
		switch (package.production) {
		case false:
			bot.user.setPresence({ activity: { name: `${package.version} [dev branch]`, type: 'WATCHING' } });
			console.log('[DEV] Connected to development branch.');
			break;
		case true:
			bot.user.setActivity(`${package.version}`, { type: 'WATCHING' });
			console.log('[DEV] Connected to production branch.');
			break;
	}
}

bot.on("error", console.error);

bot.on('message', message => {
	if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;

	const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if(!command) return;
    if(!Number.isNaN(+5000)) {
		if(message.author.id === '549315704013455361') talkedRecently.delete(message.author.id);
		if (talkedRecently.has(message.author.id)) { return message.react('🐌'); }
		talkedRecently.add(message.author.id);
		setTimeout(() => { talkedRecently.delete(message.author.id); }, 5000);
    }

	try {
		command.execute(message, args);
	} catch(e) {
		console.error(e);
		message.reply('error! If the error persists, contact __consty#9468__.').then(msg => {	msg.delete({ timeout: 10000 }) });
	}
});

// credentials
bot.login(config.bot.token);
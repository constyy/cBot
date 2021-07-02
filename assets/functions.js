const package = require('../package.json');
const bot = require('../index')
module.exports.updatePresence = function updatePresence() {
		switch (package.production) {
		case false:
			bot.user.setPresence({
			activity: { 
				name: `${package.version} [dev]`, 
				type: 'WATCHING' // or 'WATCHING' (to name a few)
			}
			});
			console.log('[DEV] Connected to development mode.');
			break;
		case true:
			bot.user.setActivity(`${package.version} [prod]`, { type: 'WATCHING' });
			console.log('[DEV] Connected to production mode.');
			break;
	}
}
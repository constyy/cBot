const http = require("http");
const port = 80;
const bot = require('../index.js');

var server = http.createServer(function (req, res) {
    if(req.url == '/info') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({ users: `${bot.users.cache.filter(user => !user.bot).size}` }));
        res.end();
    }
})

server.listen(port, (err) => {
    if(err) return console.error(err);
    console.log(`[NOTE] api listening on ${port}`)
})
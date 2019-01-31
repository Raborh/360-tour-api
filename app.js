const http = require('http');
const index = require('./index');

const port = process.env.PORT;

const server = http.createServer(index);

server.listen(port);

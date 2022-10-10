const http = require('http');
require('dotenv').config();
const cluster = require('cluster');
const app = require('./src/utils/expressInit')
const os = require('os');
const util = require('util');
const MongoStore = require('connect-mongo');
const port = process.env.PORT || 8080;

const server = http.createServer(app);
//Websocket
const { Server: IOServer } = require("socket.io");
const ioController = require('./src/controllers/socketController');
const ioCont = new ioController();
const ioServer = new IOServer(server);
ioServer.on("connection", async (socket) => ioCont.websocketController(socket, ioServer));

server.listen(port, () => {
   console.log(`Aplicación ejecutandose en el puerto: ${port}`);
});

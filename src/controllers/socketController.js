//Socket
const { chatDao } = require('../services/index');

class SocketController {
   async websocketController (socket, ioServer) {
      console.log('Lista de chats')
      socket.emit('listMessages', await chatDao.getAll());

      socket.on("messages", async (data) => {
         console.log('Envía mensaje')
         await chatDao.save(data);
         ioServer.sockets.emit("listMessages", await chatDao.getAll());
      });
   }
}

module.exports = SocketController;
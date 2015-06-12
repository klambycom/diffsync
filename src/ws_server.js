let Promise = require('promise');
let WebSocket = require('websocket').server;
let http = require('http');

let log = function (msg) {
  // TODO Only log i verbose
  console.log(`${new Date()} ${msg}`);
};

let server = http.createServer(() => { /* empty */ });
let wsServer = null;
let connected = false;

let clients = [];

let connect = function (port) {
  // Start server
  server.listen(port, () => {
    connected = true;
    log(`Server is listening on port ${port}.`);
  });
  // Create websocket server
  wsServer = new WebSocket({ httpServer: server });
  wsServer.on('request', request => {
    log(`Connection from origin ${request.origin}.`);
    // TOOD Check 'request.origin'
    let connection = request.accept(null, request.origin);
    let index = clients.push(connection) - 1;

    log('Connection accepted.');

    // User sent some message
    connection.on('message', message => {
      if (message.type === 'utf8') {
        log(`Received Message: "${message.utf8Data}".`);
        // TODO Use on('message', ...) below!
      }
    });

    // User disconnected
    connection.on('close', closedConnection => {
      log(`Peer ${closedConnection.remoteAddress} disconnected.`);
      clients.splice(index, 1);
        // TODO Use on('disconnected', ...) below!
    });
  });
};

// Send message to client
let broadcast = function (msg) {
  let json = JSON.stringify({ type: 'message', data: msg });
  clients.forEach(x => { x.sendUTF(json); });
};

// Connected/disconnected/error/message
let on = function (type, listener) {
};

module.exports = { send, receive, on };

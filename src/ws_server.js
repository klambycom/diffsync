let Promise = require('promise');
let EventEmitter = require('events').EventEmitter;
let WebSocket = require('websocket').server;
let http = require('http');

let events = new EventEmitter();

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
        events.emit('message', message.utf8Data);
      }
    });

    // User disconnected
    connection.on('close', closedConnection => {
      log(`Peer ${closedConnection.remoteAddress} disconnected.`);
      let user = clients.splice(index, 1);
      // TODO Use on('disconnected', ...) below!
      events.emit('disconnected', user);
    });
  });
};

// Send message to client
let broadcast = function (msg, to = clients) {
  let json = JSON.stringify({ type: 'message', data: msg });
  to.forEach(x => { x.sendUTF(json); });
};

// Connected/disconnected/error/message
let addListener = function (event, listener) {
  events.on(event, listener);
};

module.exports = { connect, broadcast, addListener };

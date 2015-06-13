let Promise = require('promise'); // TODO Needed?
let EventEmitter = require('events').EventEmitter;
let WebSocket = require('websocket').server;
let http = require('http');

let events = new EventEmitter();
let settings = {};

// TODO Move out to somewhere else!
settings.log = function (msg) {
  // TODO Only log if verbose
  console.log(`${new Date()} ${msg}`);
};

let server = http.createServer(() => { /* empty */ });
let wsServer = null;
let connected = false;

settings.clients = [];

let connect = function (port) {
  // Start server
  server.listen(port, () => {
    connected = true;
    settings.log(`Server is listening on port ${port}.`);
  });
  // Create websocket server
  wsServer = new WebSocket({ httpServer: server });
  wsServer.on('request', request => {
    settings.log(`Connection from origin ${request.origin}.`);
    // TOOD Check 'request.origin'
    let connection = request.accept(null, request.origin);
    // TODO Use on('connect', ...) below!
    let index = settings.clients.push(connection) - 1;

    settings.log('Connection accepted.');

    // User sent some message
    connection.on('message', message => {
      if (message.type === 'utf8') {
        settings.log(`Received Message: "${message.utf8Data}".`);
        // TODO Use on('message', ...) below!
        events.emit('message', message.utf8Data);
      }
    });

    // User disconnected
    connection.on('close', closedConnection => {
      settings.log(`Peer ${closedConnection.remoteAddress} disconnected.`);
      let user = settings.clients.splice(index, 1);
      // TODO Use on('disconnected', ...) below!
      events.emit('disconnected', user);
    });
  });
};

// Send message to client
let broadcast = function (fn, type = 'message') {
  settings.clients.forEach(x => {
    let data = fn(x);
    if (Object.keys(data) > 0) { x.sendUTF(JSON.stringify({ type, data })); }
  });
};

// Connected/disconnected/error/message
let addListener = function (event, listener) {
  events.on(event, listener);
};

module.exports = { connect, broadcast, addListener, settings };

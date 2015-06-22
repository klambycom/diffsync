/* global -Promise */
//let Promise = require('promise'); // TODO Needed?
let EventEmitter = require('events').EventEmitter;
/* global -WebSocket */
let WebSocket = require('websocket').server;
let http = require('http');
let users = require('./users.js');
let log = require('./log.js')('WEBSOCKET');

let events = new EventEmitter();

let server = http.createServer(() => { /* empty */ });
let connected = false;

let _connect = request => {
  log(`Connection from origin ${request.origin}.`);

  // TOOD Check 'request.origin'
  let connection = request.accept(null, request.origin);
  log('Connection accepted.');

  // Create the new user
  let user = users.create(connection);
  events.emit('new_user', user);

  return { connection, user };
};

let _message = message => {
  if (message.type === 'utf8') {
    log(`Received Message: "${message.utf8Data}".`);
    // TODO Use on('message', ...) below!
    events.emit('message', message.utf8Data);
  }
};

let _request = function (request) {
  // Connect
  let { connection, user } = _connect(request);

  // User sent some message
  connection.on('message', _message);

  // User disconnected
  connection.on('close', closedConnection => {
    log(`Peer ${closedConnection.remoteAddress} disconnected.`);
    users.remove(user);
    events.emit('disconnected', user);
  });
};

let connect = function (port = 8000) {
  // Start server
  server.listen(port, () => {
    connected = true;
    log(`Server is listening on port ${port}.`);
    // TODO Is this the right place?
    // TODO Maybe pass fns like broadcast with event instead of checking
    // connection (connected = true) when using them? For easier use.
    events.emit('connected', {});
  });
  // Create websocket server
  let ws = new WebSocket({ httpServer: server });
  ws.on('request', _request);
};

// Send message to all clients
let broadcast = function (fn, type = 'message') {
  users.forEach(x => x.send(fn(x), type));
};

// Connected/disconnected/error/message
let addListener = function (event, listener) {
  events.on(event, listener);
};

module.exports = { connect, broadcast, addListener };

/* global -Promise */
//let Promise = require('promise'); // TODO Needed?
'use strict';

var EventEmitter = require('events').EventEmitter;
/* global -WebSocket */
var WebSocket = require('websocket').server;
var http = require('http');
var users = require('./users.js');
var log = require('./log.js')('WEBSOCKET');

var events = new EventEmitter();
// TODO Remove settings! Only port is available and can also be used with connect()!
var settings = {};

var server = http.createServer(function () {});
var connected = false;

settings.port = 8000;

var _connect = function _connect(request) {
  log('Connection from origin ' + request.origin + '.');

  // TOOD Check 'request.origin'
  var connection = request.accept(null, request.origin);
  log('Connection accepted.');

  // Create the new user
  var user = users.create(connection);
  events.emit('new_user', user);

  return { connection: connection, user: user };
};

var _message = function _message(message) {
  if (message.type === 'utf8') {
    log('Received Message: "' + message.utf8Data + '".');
    // TODO Use on('message', ...) below!
    events.emit('message', message.utf8Data);
  }
};

var _request = function _request(request) {
  // Connect

  var _connect2 = _connect(request);

  var connection = _connect2.connection;
  var user = _connect2.user;

  // User sent some message
  connection.on('message', _message);

  // User disconnected
  connection.on('close', function (closedConnection) {
    log('Peer ' + closedConnection.remoteAddress + ' disconnected.');
    users.remove(user);
    events.emit('disconnected', user);
  });
};

var connect = function connect() {
  var port = arguments[0] === undefined ? settings.port : arguments[0];

  // Start server
  server.listen(port, function () {
    connected = true;
    log('Server is listening on port ' + port + '.');
    // TODO Is this the right place?
    // TODO Maybe pass fns like broadcast with event instead of checking
    // connection (connected = true) when using them? For easier use.
    events.emit('connected', {});
  });
  // Create websocket server
  var ws = new WebSocket({ httpServer: server });
  ws.on('request', _request);
};

// Send message to all clients
var broadcast = function broadcast(fn) {
  var type = arguments[1] === undefined ? 'message' : arguments[1];

  users.forEach(function (x) {
    return x.send(fn(x), type);
  });
};

// Connected/disconnected/error/message
var addListener = function addListener(event, listener) {
  events.on(event, listener);
};

module.exports = { connect: connect, broadcast: broadcast, addListener: addListener, settings: settings };
/* empty */
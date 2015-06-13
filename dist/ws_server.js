'use strict';

var Promise = require('promise'); // TODO Needed?
var EventEmitter = require('events').EventEmitter;
var WebSocket = require('websocket').server;
var http = require('http');

var events = new EventEmitter();
var settings = {};

// TODO Move out to somewhere else!
settings.log = function (msg) {
  // TODO Only log if verbose
  console.log('' + new Date() + ' ' + msg);
};

var server = http.createServer(function () {});
var connected = false;

settings.clients = [];

var _connect = function _connect(request) {
  settings.log('Connection from origin ' + request.origin + '.');
  // TOOD Check 'request.origin'
  var connection = request.accept(null, request.origin);
  // TODO Use on('connect', ...) below!
  var index = settings.clients.push(connection) - 1;

  settings.log('Connection accepted.');

  return { connection: connection, index: index };
};

var _message = function _message(message) {
  if (message.type === 'utf8') {
    settings.log('Received Message: "' + message.utf8Data + '".');
    // TODO Use on('message', ...) below!
    events.emit('message', message.utf8Data);
  }
};

var _request = function _request(request) {
  // Connect

  var _connect2 = _connect(request);

  var connection = _connect2.connection;
  var index = _connect2.index;

  // User sent some message
  connection.on('message', _message);

  // User disconnected
  connection.on('close', function (closedConnection) {
    settings.log('Peer ' + closedConnection.remoteAddress + ' disconnected.');
    var user = settings.clients.splice(index, 1);
    // TODO Use on('disconnected', ...) below!
    events.emit('disconnected', user);
  });
};

var connect = function connect(port) {
  // Start server
  server.listen(port, function () {
    connected = true;
    settings.log('Server is listening on port ' + port + '.');
  });
  // Create websocket server
  var ws = new WebSocket({ httpServer: server });
  ws.on('request', _request);
};

// Send message to client
var broadcast = function broadcast(fn) {
  var type = arguments[1] === undefined ? 'message' : arguments[1];

  settings.clients.forEach(function (x) {
    var data = fn(x);
    if (Object.keys(data) > 0) {
      x.sendUTF(JSON.stringify({ type: type, data: data }));
    }
  });
};

// Connected/disconnected/error/message
var addListener = function addListener(event, listener) {
  events.on(event, listener);
};

module.exports = { connect: connect, broadcast: broadcast, addListener: addListener, settings: settings };
/* empty */
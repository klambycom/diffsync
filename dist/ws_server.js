/* global -Promise */
//let Promise = require('promise'); // TODO Needed?
'use strict';

var EventEmitter = require('events').EventEmitter;
/* global -WebSocket */
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
settings.port = 8000;

var _connect = function _connect(request) {
  settings.log('Connection from origin ' + request.origin + '.');

  // TOOD Check 'request.origin'
  var connection = request.accept(null, request.origin);
  settings.log('Connection accepted.');

  // TODO Use on('connect', ...) below!
  var index = settings.clients.push(connection) - 1;
  events.emit('new_user', connection);

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

var connect = function connect() {
  var port = arguments[0] === undefined ? settings.port : arguments[0];

  // Start server
  server.listen(port, function () {
    connected = true;
    settings.log('Server is listening on port ' + port + '.');
    // TODO Is this the right place?
    // TODO Maybe pass fns like broadcast with event instead of checking
    // connection (connected = true) when using them? For easier use.
    events.emit('connected', {});
  });
  // Create websocket server
  var ws = new WebSocket({ httpServer: server });
  ws.on('request', _request);
};

// TODO Move to users, but provide a way to change the function in ws_server!
var _send = function _send(user) {
  return function (data) {
    var type = arguments[1] === undefined ? 'message' : arguments[1];

    if (Object.keys(data).length > 0) {
      user.sendUTF(JSON.stringify({ type: type, data: data }));
    }
  };
};

// Send message to client
var broadcast = function broadcast(fn) {
  var type = arguments[1] === undefined ? 'message' : arguments[1];

  settings.clients.forEach(function (x) {
    var data = fn(x);
    if (Object.keys(data).length > 0) {
      x.sendUTF(JSON.stringify({ type: type, data: data }));
    }
  });
};

// Send message to one specific client
var send = function send(user, type, data) {
  settings.clients[user].sendUTF(JSON.stringify({ type: type, data: data }));
};

// Connected/disconnected/error/message
var addListener = function addListener(event, listener) {
  events.on(event, listener);
};

module.exports = { connect: connect, broadcast: broadcast, send: send, addListener: addListener, settings: settings };
/* empty */
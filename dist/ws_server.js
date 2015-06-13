'use strict';

var Promise = require('promise');
var EventEmitter = require('events').EventEmitter;
var WebSocket = require('websocket').server;
var http = require('http');

var events = new EventEmitter();
var settings = {};

settings.log = function (msg) {
  // TODO Only log if verbose
  console.log('' + new Date() + ' ' + msg);
};

var server = http.createServer(function () {});
var wsServer = null;
var connected = false;

settings.clients = [];

var connect = function connect(port) {
  // Start server
  server.listen(port, function () {
    connected = true;
    settings.log('Server is listening on port ' + port + '.');
  });
  // Create websocket server
  wsServer = new WebSocket({ httpServer: server });
  wsServer.on('request', function (request) {
    settings.log('Connection from origin ' + request.origin + '.');
    // TOOD Check 'request.origin'
    var connection = request.accept(null, request.origin);
    // TODO Use on('connect', ...) below!
    var index = settings.clients.push(connection) - 1;

    settings.log('Connection accepted.');

    // User sent some message
    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        settings.log('Received Message: "' + message.utf8Data + '".');
        // TODO Use on('message', ...) below!
        events.emit('message', message.utf8Data);
      }
    });

    // User disconnected
    connection.on('close', function (closedConnection) {
      settings.log('Peer ' + closedConnection.remoteAddress + ' disconnected.');
      var user = settings.clients.splice(index, 1);
      // TODO Use on('disconnected', ...) below!
      events.emit('disconnected', user);
    });
  });
};

// Send message to client
var broadcast = function broadcast(msg) {
  var to = arguments[1] === undefined ? settings.clients : arguments[1];

  var json = JSON.stringify({ type: 'message', data: msg });
  to.forEach(function (x) {
    x.sendUTF(json);
  });
};

// Connected/disconnected/error/message
var addListener = function addListener(event, listener) {
  events.on(event, listener);
};

module.exports = { connect: connect, broadcast: broadcast, addListener: addListener, settings: settings };
/* empty */
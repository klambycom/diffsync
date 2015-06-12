'use strict';

var Promise = require('promise');
var WebSocket = require('websocket').server;
var http = require('http');

var log = function log(msg) {
  // TODO Only log i verbose
  console.log('' + new Date() + ' ' + msg);
};

var server = http.createServer(function () {});
var wsServer = null;
var connected = false;

var clients = [];

var connect = function connect(port) {
  // Start server
  server.listen(port, function () {
    connected = true;
    log('Server is listening on port ' + port + '.');
  });
  // Create websocket server
  wsServer = new WebSocket({ httpServer: server });
  wsServer.on('request', function (request) {
    log('Connection from origin ' + request.origin + '.');
    // TOOD Check 'request.origin'
    var connection = request.accept(null, request.origin);
    var index = clients.push(connection) - 1;

    log('Connection accepted.');

    // User sent some message
    connection.on('message', function (message) {
      if (message.type === 'utf8') {
        log('Received Message: "' + message.utf8Data + '".');
        // TODO Use on('message', ...) below!
      }
    });

    // User disconnected
    connection.on('close', function (closedConnection) {
      log('Peer ' + closedConnection.remoteAddress + ' disconnected.');
      clients.splice(index, 1);
      // TODO Use on('disconnected', ...) below!
    });
  });
};

// Send message to client
var broadcast = function broadcast(msg) {
  var json = JSON.stringify({ type: 'message', data: msg });
  clients.forEach(function (x) {
    x.sendUTF(json);
  });
};

// Connected/disconnected/error/message
var on = function on(type, listener) {};

module.exports = { send: send, receive: receive, on: on };
/* empty */
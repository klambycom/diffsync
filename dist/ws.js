'use strict';

var Promise = require('promise');
var WebSocket = require('websocket').server;
var http = require('http');

var server = http.createServer(function () {});
var wsServer = null;
var connected = false;

var connect = function connect(port) {
  // Start server
  server.listen(port, function () {
    connected = true;
    console.log(new Date() + ' Server is listening on port ' + port);
  });
  // Create websocket server
  wsServer = new WebSocket({ httpServer: server });
};

// Send message to client
var send = function send(msg) {};

// Receive mesage from server
var receive = function receive() {};

// Connect/disconnect/error
var on = function on() {};

module.exports = { send: send, receive: receive, on: on };
/* empty */
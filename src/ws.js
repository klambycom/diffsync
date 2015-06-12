let Promise = require('promise');
let WebSocket = require('websocket').server;
let http = require('http');

let server = http.createServer(() => { /* empty */ });
let wsServer = null;
let connected = false;

let connect = function (port) {
  // Start server
  server.listen(port, () => {
    connected = true;
    console.log((new Date()) + " Server is listening on port " + port);
  });
  // Create websocket server
  wsServer = new WebSocket({ httpServer: server });
};

// Send message to client
let send = function (msg) {
};

// Receive mesage from server
let receive = function () {
};

// Connect/disconnect/error
let on = function () {
};

module.exports = { send, receive, on };

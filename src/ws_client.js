/* global -WebSocket */
let WebSocket = require('websocket').server;
//let WebSocket = window.WebSocket || window.MozWebSocket || require('websocket').server;
let EventEmitter = require('events').EventEmitter;

let events = new EventEmitter();
let connection;
let connected = false;

let settings = {};
settings.url = 'ws://127.0.0.1:8000';

let _message = function (msg) {
  try {
    let json = JSON.parse(msg.data);
    // TODO Maybe check type to deside the event
    events.emit('message', msg);
  } catch (e) {
    console.log(`This doesn't look like a valid JSON: ${msg.data}`);
  }
};

let connect = function () {
  connection = new WebSocket(settings.url);

  connection.onerror = error => events.emit('error', error);
  connection.onmessage = _message;

  // Connected to WebSocket-server
  connection.onopen = () => {
    connected = true;
    // TODO Wait for init document, and send it along with the event.
    events.emit('connected', {});
  };
};

let send = function (msg) {
  if (!connected) { return; }
  // TODO Use JSON?
  connection.send(msg);
};

let addListener = function (event, listener) {
  events.on(event, listener);
};

module.exports = { connect, send, addListener };

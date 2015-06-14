/* global -WebSocket */
'use strict';

var WebSocket = require('websocket').server;
//let WebSocket = window.WebSocket || window.MozWebSocket || require('websocket').server;
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();

var settings = {};
settings.url = 'ws://127.0.0.1:8000';

var connect = function connect() {
  var connection = new WebSocket(settings.url);

  connection.onerror = function (error) {
    return events.emit('error', error);
  };
  connection.onmessage = function (msg) {
    return events.emit('message', msg);
  };

  // Connected to WebSocket-server
  connection.onopen = function () {
    // TODO Wait for init document, and send it along with the event.
    events.emit('connected', {});
  };
};

var send = function send() {};

var addListener = function addListener(event, listener) {
  events.on(event, listener);
};

module.exports = { connect: connect, send: send, addListener: addListener };
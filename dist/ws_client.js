/* global -WebSocket */
'use strict';

var WebSocket = window.WebSocket || window.MozWebSocket;
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();
var connection = undefined;
var connected = false;

var settings = {};
settings.url = 'ws://127.0.0.1:8000';

var _message = function _message(msg) {
  try {
    var json = JSON.parse(msg.data);

    if (json.type === 'init_document') {
      events.emit('ready', json);
    } else {
      events.emit('message', json);
    }
  } catch (e) {
    console.log('This doesn\'t look like a valid JSON: ' + msg.data);
  }
};

var connect = function connect() {
  // TODO Catch errors? Ex. when url is wrong.
  connection = new WebSocket(settings.url);

  connection.onerror = function (error) {
    return events.emit('error', error);
  };
  connection.onmessage = _message;

  // Connected to WebSocket-server
  connection.onopen = function () {
    connected = true;
    // TODO Wait for init document, and send it along with the event. Or ready
    // event!
    events.emit('connected', {});
  };
};

var send = function send(msg) {
  if (!connected) {
    return;
  }
  // TODO Use JSON?
  connection.send(msg);
};

var addListener = function addListener(event, listener) {
  events.on(event, listener);
};

module.exports = { connect: connect, send: send, addListener: addListener, settings: settings };
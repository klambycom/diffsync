'use strict';

var Promise = require('promise');

// Send message to server/client
var send = function send(msg) {};

// Receive mesage from server/client
var receive = function receive() {};

// Connect/disconnect/error
var on = function on() {};

module.exports = { send: send, receive: receive, on: on };
/* global -WebSocket */
'use strict';

var WebSocket = require('websocket').server;
//let WebSocket = window.WebSocket || window.MozWebSocket || require('websocket').server;

var settings = {};
settings.url = 'ws://127.0.0.1:8000';

var connect = function connect() {
  var connection = new WebSocket(settings.url);
  connection.onopen = function () {};
  connection.onerror = function (error) {};
  connection.onmessage = function (msg) {};
};

var send = function send() {};

var addListener = function addListener() {};

module.exports = { connect: connect, send: send, addListener: addListener };
/* TODO */ /* TODO */ /* TODO */
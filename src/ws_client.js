/* global -WebSocket */
let WebSocket = require('websocket').server;
//let WebSocket = window.WebSocket || window.MozWebSocket || require('websocket').server;

let settings = {};
settings.url = 'ws://127.0.0.1:8000';

let connect = function () {
  let connection = new WebSocket(settings.url);
  connection.onopen = () => { /* TODO */ };
  connection.onerror = error => { /* TODO */ };
  connection.onmessage = msg => { /* TODO */ };
};

let send = function () {};

let addListener = function () {};

module.exports = { connect, send, addListener };

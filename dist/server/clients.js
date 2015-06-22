'use strict';

var Doc = require('../document');
var clients = [];

// Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
var _createUUID = function _createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 3 | 8; // jshint ignore:line
    return v.toString(16);
  });
};

// Send message to one specific client
var _send = function _send(client) {
  return function (data) {
    var type = arguments[1] === undefined ? 'message' : arguments[1];

    if (Object.keys(data).length > 0) {
      client.sendUTF(JSON.stringify({ type: type, data: data }));
    }
  };
};

// Add client and create doc and shadow
// Return client if client is valid
var create = function create(websocket) {
  var client = {
    uuid: _createUUID(),
    send: _send(websocket),
    // TODO Update document to latest!
    shadow: new Doc(),
    websocket: websocket
  };

  clients.push(client);
  return client;
};

// Remove client
var remove = function remove(client) {
  clients = clients.filter(function (x) {
    return client.uuid !== x.uuid;
  });
};

// Array containing all users
var all = function all() {
  return JSON.parse(JSON.stringify(clients));
};

var forEach = function forEach(currentValue, index, array) {
  clients.forEach(currentValue, index, array);
};

module.exports = { create: create, remove: remove, all: all, forEach: forEach };
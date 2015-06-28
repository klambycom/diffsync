/**
 * # Clients
 *
 * Handle clients.
 */

/*! */

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

/**
 * Add client and create doc and shadow
 *
 * @function create
 * @param {Object} websocket Websocket-object from ws-server
 * @return {Object} Client if client is valid
 */

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

/**
 * Remove client
 *
 * @function remove
 * @param {Object} client The client to remove
 */

var remove = function remove(client) {
  clients = clients.filter(function (x) {
    return client.uuid !== x.uuid;
  });
};

/**
 * Array containing all users
 *
 * @function all
 * @return {Array} All clients
 */

var all = function all() {
  return JSON.parse(JSON.stringify(clients));
};

/**
 * Call function for every client
 *
 * @function forEach
 * @param {Function} fn Function with the parameters currentValue, index and array
 */

var forEach = function forEach(fn) {
  clients.forEach(fn);
};

module.exports = { create: create, remove: remove, all: all, forEach: forEach };
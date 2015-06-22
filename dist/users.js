'use strict';

var clients = [];

// Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
var _createUUID = function _createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 3 | 8; // jshint ignore:line
    return v.toString(16);
  });
};

// TODO Move to users, but provide a way to change the function in ws_server!
var _send = function _send(user) {
  return function (data) {
    var type = arguments[1] === undefined ? 'message' : arguments[1];

    if (Object.keys(data).length > 0) {
      user.sendUTF(JSON.stringify({ type: type, data: data }));
    }
  };
};

// Add user and create doc and shadow
// Return user if user is valid
var create = function create(websocket) {
  var user = { uuid: _createUUID(), send: _send(websocket), websocket: websocket };
  clients.push(user);
  return user;
};

// Remove user
var remove = function remove(user) {
  clients = clients.filter(function (x) {
    return user.uuid !== x.uuid;
  });
};

// Array containing all users
// TODO Create copy of clients?
// TODO Remove?
var all = function all() {
  return clients;
};

var forEach = function forEach(currentValue, index, array) {
  clients.forEach(currentValue, index, array);
};

module.exports = { create: create, remove: remove, all: all, forEach: forEach };
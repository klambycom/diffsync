'use strict';

var clients = [];

// Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
var _createUUID = function _createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 3 | 8;
    return v.toString(16);
  });
};

// Add user and create doc and shadow
// Return user if user is valid
var create = function create(websocket) {
  var user = { uuid: _createUUID(), websocket: websocket };
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
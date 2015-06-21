"use strict";

var clients = [];

// Add user and create doc and shadow
var add = function add(user) {};

// Remove user
var remove = function remove(user) {};

// Array containing all users
// TODO Create copy of clients?
var all = function all() {
  return clients;
};

var forEach = clients.forEach;

module.exports = { add: add, remove: remove, all: all, forEach: forEach };
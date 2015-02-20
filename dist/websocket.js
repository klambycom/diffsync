"use strict";

// TODO Remove this file?

var listeners = [];

module.exports = {
  emit: function emit(name, object) {
    console.log(listeners);
  },

  connect: function connect(client) {
    listeners.push(client);
  }
};
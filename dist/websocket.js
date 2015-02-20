"use strict";

// TODO Remove this file?

var listeners = [];

module.exports = {
  emit: function emit(name, object) {
    listeners.forEach(function (fn) {
      return fn(object);
    });
  },

  onPatch: function onPatch(fn) {
    listeners.push(fn);
  }
};
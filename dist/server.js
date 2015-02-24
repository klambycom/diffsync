"use strict";

/**
 * # Server(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

var Document = require("./document");
var websocket = require("./websocket");
var EventEmitter = require("events").EventEmitter;

module.exports = function (socket) {
  var doc = new Document();
  var eventemitter = new EventEmitter();
  var edits = websocket(socket, doc, eventemitter);

  return {
    /**
     * Listen for events
     *
     * ### Events:
     *
     * * diff
     * * patch
     *
     * @method on
     * @param {String} event
     * @param {Function} listener
     */

    on: function on(event, listener) {
      eventemitter.on(event, listener);
    }
  };
};
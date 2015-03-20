"use strict";

/**
 * # Server(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

var Document = require("./document");
var websocket = require("./websocket");

module.exports = function (socket) {
  var doc = new Document();
  var edits = websocket(socket, doc);

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

    on: edits.eventemitter.on
  };
};
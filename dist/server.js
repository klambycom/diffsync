"use strict";

/**
 * # Server(socket)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **Document** *doc* Optional param for creating the document
 */

/*! */

var Document = require("./document");
var websocket = require("./websocket");

module.exports = function (socket) {
  var doc = arguments[1] === undefined ? new Document() : arguments[1];
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
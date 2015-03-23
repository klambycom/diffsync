/**
 * # Server(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* Optional param for creating the document
 */

/*! */

"use strict";

var JSONDocument = require("./document");
var websocket = require("./websocket");

module.exports = function (socket) {
  var doc = arguments[1] === undefined ? new JSONDocument() : arguments[1];

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
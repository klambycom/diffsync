"use strict";

// TODO Remove this file? Rename? Edits?

/**
 * # Websocket(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* 
 * **EventEmitter** *eventemitter* Optional
 */

/*! */

var JSONDocument = require("./document");
var EventEmitter = require("events").EventEmitter;

module.exports = function (socket, doc) {
  var eventemitter = arguments[2] === undefined ? new EventEmitter() : arguments[2];
  var shadow = new JSONDocument();

  // Create patch from received diff
  socket.on("diff", function edits(data) {
    doc.patch(data);
    shadow.patch(data);
    eventemitter.emit("patch", data);
  });

  return {

    /**
     * Send diff to clients/server
     *
     * @method sendDiff
     */

    sendDiff: function sendDiff() {
      var diff = doc.diff(shadow);
      shadow.patch(diff);
      socket.emit("diff", diff);
      eventemitter.emit("diff", diff);
    },

    /**
     * ## eventemitter
     *
     * EventEmitter
     *
     * ### Events:
     *
     * * diff
     * * patch
     *
     * @type EventEmitter
     */

    eventemitter: eventemitter
  };
};
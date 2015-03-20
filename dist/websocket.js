"use strict";

// TODO Remove this file? Rename? Edits?

/**
 * # Websocket(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **Document** *doc* 
 * **EventEmitter** *eventemitter* Optional
 */

/*! */

var Document = require("./document");
var EventEmitter = require("events").EventEmitter;

module.exports = function (socket, doc) {
  var eventemitter = arguments[2] === undefined ? new EventEmitter() : arguments[2];
  var shadow = new Document();

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
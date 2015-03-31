// TODO Remove this file? Rename? Edits?

/**
 * # Websocket(socket, doc)
 *
 * This function is called edits (TODO) because takes the diffs and create
 * "edits" to send to the server.
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* 
 * **EventEmitter** *eventemitter* Optional
 */

/*! */

"use strict";

var JSONDocument = require("./document");
var EventEmitter = require("events").EventEmitter;

module.exports = function edits(socket, doc) {
  var eventemitter = arguments[2] === undefined ? new EventEmitter() : arguments[2];

  var shadow = new JSONDocument();

  // Create patch from received diff
  socket.on("diff", function edits(data) {
    doc.patch(data);
    shadow.patch(data);
    eventemitter.emit("patch", data);
  });

  // Update document when initial document is received
  socket.on("init_document", function (data) {
    doc.update(data);
    shadow.update(data);
    eventemitter.emit("update", data);
  });

  return {

    /**
     * Send diff to clients/server
     *
     * @method sendDiff
     * @returns false if there is no diff, else true
     */

    sendDiff: function sendDiff() {
      var diff = doc.diff(shadow);

      if (typeof diff !== "undefined") {
        shadow.patch(diff);
        socket.emit("diff", diff);
        eventemitter.emit("diff", diff);

        return true;
      }

      return false;
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
     * * update
     *
     * @type EventEmitter
     */

    eventemitter: eventemitter
  };
};
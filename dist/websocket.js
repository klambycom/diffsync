"use strict";

// TODO Remove this file? Rename? Edits?

/**
 * # Websocket(socket, doc)
 *
 * **Socket.io** *socket* 
 * **Document** *doc* 
 */

/*! */

var Document = require("./document");
var EventEmitter = require("events").EventEmitter;

module.exports = function (socket, doc) {
  var shadow = new Document();
  var ee = new EventEmitter();

  // Create patch from received diff
  socket.on("diff", function edits(data) {
    doc.patch(data);
    shadow.patch(data);
    ee.emit("patch", data);
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
      ee.emit("diff", diff);
    },

    /**
     * Send diff to clients/server
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
      ee.on(event, listener);
    }
  };
};
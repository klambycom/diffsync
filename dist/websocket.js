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

module.exports = function (socket, doc, eventemitter) {
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
    }
  };
};
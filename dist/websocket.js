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
  socket.on("DIFF", function edits(data) {
    // Step 4, a patch is created from the changes
    var patch = data;

    // Step 5, both the doc and shadow is patched
    doc.patch(data); // Get document from Redis, to always have the latest
    // Save doc to db if on server
    shadow.patch(data); // Shadow should be the same as on client before edits

    //eventemitter.emit('patch', data); // Needed?
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
        // Step 2, changes are copied to the shadow
        shadow.patch(diff);

        // Step 3a, changes are sent to server
        socket.emit("DIFF", diff);
        return true;

        //eventemitter.emit('diff', diff); // TODO Needed?
      }

      // Step 3b, nothing is sent to the server
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
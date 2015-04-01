// TODO Remove this file? Rename? Edits?

/**
 * # edits(socket, doc)
 *
 * This function is called edits because takes the diffs and create
 * "edits" to send to the server. But this is all code shared by both server
 * and client, so maybe it's not the best name.
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* 
 * **StorageDriver** *storage* 
 * **EventEmitter** *eventemitter* Optional
 */

/*! */

"use strict";

var JSONDocument = require("./document");
var EventEmitter = require("events").EventEmitter;

module.exports = function edits(socket, doc, storage) {
  var eventemitter = arguments[3] === undefined ? new EventEmitter() : arguments[3];

  var shadow = new JSONDocument();

  var sendDiff = function sendDiff() {
    var diff = doc.diff(shadow);

    // Step 7, continue to send diff as long as the documents is not identical
    if (typeof diff !== "undefined") {
      // Step 2, changes are copied to the shadow
      shadow.patch(diff);

      // Step 3a, changes are sent to server
      socket.emit("DIFF", diff);
      return true;
    }

    // Step 3b, nothing is sent to the server
    return false;
  };

  var patchDocs = function patchDocs(data) {
    doc.patch(data);
    shadow.patch(data);
    eventemitter.emit("update", doc.json());

    // Step 6, send new diff to all connected clients
    sendDiff();
  };

  // Create patch from received diff
  socket.on("DIFF", function edits(data) {
    // Step 4, a patch is created from the changes
    var patch = data;

    // Step 5, both the doc and shadow is patched
    if (typeof storage === "undefined") {
      patchDocs(patch);
    } else {
      // TODO Handle error!
      storage.getJSON().then(function (json /*, error*/) {
        doc.update(json);
        patchDocs(patch);
        // Save
        storage.setFromDocument(doc);
      });
    }
  });

  // Update document when initial document is received
  socket.on("init_document", function (data) {
    doc.update(data);
    shadow.update(data);
    eventemitter.emit("update", doc.json());
  });

  return {

    /**
     * Send diff to clients/server
     *
     * @method sendDiff
     * @returns false if there is no diff, else true
     */

    sendDiff: sendDiff,

    /**
     * ## eventemitter
     *
     * EventEmitter
     *
     * ### Events:
     *
     * * update
     *
     * @type EventEmitter
     */

    eventemitter: eventemitter
  };
};
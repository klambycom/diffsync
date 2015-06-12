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
 * **JSONDocument** *shadow* 
 * **StorageDriver** *storage* 
 * **EventEmitter** *eventemitter* Optional
 */

/*! */

'use strict';

var EventEmitter = require('events').EventEmitter;

module.exports = function edits(socket, doc, shadow, storage) {
  var eventemitter = arguments[4] === undefined ? new EventEmitter() : arguments[4];

  var sendDiff = function sendDiff() {
    var diff = doc.diff(shadow);

    // Step 7, continue to send diff as long as the documents is not identical
    if (typeof diff !== 'undefined') {
      // Step 2, changes are copied to the shadow
      shadow.patch(diff);

      // Step 3a, changes are sent to server
      socket.emit('DIFF', diff);
      return true;
    }

    // Step 3b, nothing is sent to the server
    return false;
  };

  var patch = function patch(data) {
    if (typeof data !== 'undefined') {
      doc.patch(data);
      shadow.patch(data);
      eventemitter.emit('update', doc.json());
    }

    // Step 6, send new diff to all connected clients
    sendDiff();
  };

  // Create patch from received diff
  socket.on('DIFF', function edits(data) {
    // Step 4, a patch is created from the changes
    // Step 5, both the doc and shadow is patched
    console.log('before', doc.json());
    patch(data);
    console.log('after', doc.json());

    if (typeof storage !== 'undefined') {
      // Save
      storage.setFromDocument(doc);
      // Send event to redis
      storage.publishDiff();
    }
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

    eventemitter: eventemitter,

    patch: patch
  };
};
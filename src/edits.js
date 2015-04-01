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

let JSONDocument = require('./document');
let EventEmitter = require('events').EventEmitter;

module.exports = function edits(socket, doc, storage, eventemitter = new EventEmitter) {
  let shadow = new  JSONDocument();

  let sendDiff = function sendDiff() {
    let diff = doc.diff(shadow);

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

  // TODO Handle error!
  let patchAndSave = function patchAndSave(data, error) {
    doc.patch(data); // Get document from Redis, to always have the latest
    // Save doc to db if on server
    shadow.patch(data); // Shadow should be the same as on client before edits
  };

  // Create patch from received diff
  socket.on('DIFF', function edits(data) {
    // Step 4, a patch is created from the changes
    let patch = data;

    // Step 5, both the doc and shadow is patched
    if (typeof storage === 'undefined') {
      doc.patch(data);
      shadow.patch(data);
    } else {
      storage.getJSON().then(patchAndSave);
    }

    eventemitter.emit('update', doc.json());

    // Step 6, send new diff to all connected clients
    sendDiff();
  });

  // Update document when initial document is received
  socket.on('init_document', data => {
    doc.update(data);
    shadow.update(data);
    eventemitter.emit('update', doc.json());
  });

  return {

    /**
     * Send diff to clients/server
     *
     * @method sendDiff
     * @returns false if there is no diff, else true
     */

    sendDiff,

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

    eventemitter
  };
};

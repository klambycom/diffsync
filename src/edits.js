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

let EventEmitter = require('events').EventEmitter;

module.exports = function edits(socket, doc, shadow, storage, eventemitter = new EventEmitter) {
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

  let patchDocs = function patchDocs(data) {
    doc.patch(data);
    shadow.patch(data);
    eventemitter.emit('update', doc.json());

    // Step 6, send new diff to all connected clients
    sendDiff();
  };

  // Create patch from received diff
  socket.on('DIFF', function edits(data) {
    // Step 4, a patch is created from the changes
    let patch = data;

    // Step 5, both the doc and shadow is patched
    if (typeof storage === 'undefined') {
      patchDocs(patch);
    } else {
      // TODO Handle error!
      storage.getJSON().then((json, error) => {
        if (error) {
          console.log(error);
        } else {
          doc.update(json);
          patchDocs(patch);
          // Save
          storage.setFromDocument(doc);
          // Send event to redis
          storage.publishDiff();
        }
      });
    }
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
     * * update
     *
     * @type EventEmitter
     */

    eventemitter
  };
};

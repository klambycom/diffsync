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

let JSONDocument = require('./document');
let EventEmitter = require('events').EventEmitter;

module.exports = function edits(socket, doc, shadow, storage, eventemitter = new EventEmitter) {
  let sendDiff = function sendDiff() {
    let diff = doc.diff(shadow);

    // Step 7, continue to send diff as long as the documents is not identical
    if (typeof diff !== 'undefined') {
      // Step 2, changes are copied to the shadow
      console.log('Step 2, changes are copied to the shadow');
      shadow.patch(diff);

      // Step 3a, changes are sent to server
      console.log('Step 3a, changes are sent to server/klient');
      socket.emit('DIFF', diff);
      return true;
    }

    // Step 3b, nothing is sent to the server
    console.log('Step 3b, nothing is sent to the server');
    return false;
  };

  let patchDocs = function patchDocs(data) {
    console.log('PATCH doc');
    doc.patch(data);
    console.log('PATCH shadow');
    console.log(data);
    shadow.patch(data);
    console.log('Emit update');
    eventemitter.emit('update', doc.json());

    // Step 6, send new diff to all connected clients
    console.log('Step 6, continue algorithm');
    sendDiff();
  };

  // Create patch from received diff
  socket.on('DIFF', function edits(data) {
    // Step 4, a patch is created from the changes
    console.log('Step 4, recevied diff and create patch form it');
    let patch = data;

    // Step 5, both the doc and shadow is patched
    if (typeof storage === 'undefined') {
      console.log('Step 5, doc and shadow is patched on client');
      patchDocs(patch);
    } else {
      // TODO Handle error!
      console.log('Step 5, doc and shadow is patched on server');
      storage.getJSON().then((json, error) => {
        if (error) {
          console.log('ERROR');
          console.log(error);
        } else {
          console.log('No ERROR');
        }
        console.log('Update doc with fetched json from redis');
        doc.update(json);
        console.log('Call function patchDocs(patch)');
        console.log(typeof patchDocs);
        console.log(typeof patch);
        patchDocs(patch);
        // Save
        console.log('Save document to server');
        storage.setFromDocument(doc);
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

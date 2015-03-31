// TODO Remove this file? Rename? Edits?

/**
 * # Websocket(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* 
 * **EventEmitter** *eventemitter* Optional
 */

/*! */

let JSONDocument = require('./document');
let EventEmitter = require('events').EventEmitter;

module.exports = function edits(socket, doc, eventemitter = new EventEmitter) {
  let shadow = new  JSONDocument();

  // Create patch from received diff
  socket.on('diff', function edits(data) {
    doc.patch(data);
    shadow.patch(data);
    eventemitter.emit('patch', data);
  });


  // Update document when initial document is received
  socket.on('init_document', data => {
    doc.update(data);
    shadow.update(data);
    eventemitter.emit('update', data);
  });

  return {

    /**
     * Send diff to clients/server
     *
     * @method sendDiff
     * @returns false if there is no diff, else true
     */

    sendDiff() {
      let diff = doc.diff(shadow);

      if (typeof diff !== 'undefined') {
        shadow.patch(diff);
        socket.emit('diff', diff);
        eventemitter.emit('diff', diff);

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

    eventemitter
  };
};

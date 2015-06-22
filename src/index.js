/**
 * # Client(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* Optional param for creating the document
 */

/*! */

let JSONDocument = require('./document');
let _edits = require('./edits');
let EventEmitter = require('events').EventEmitter;

module.exports = function clients(socket, doc = new JSONDocument) {
  let shadow = new JSONDocument();
  let eventemitter = new EventEmitter();
  let edits = _edits(socket, doc, shadow, undefined, eventemitter);

  // Update document when initial document is received
  let counter = 0; // Ugly hack! Counter is needed because fired two times when
                   // client reconnects. I don't know if it's because this is
                   // inside socket.on('connect'). isEmpty() returns false
                   // first than true. This will work for now.
  socket.on('init_document', data => {
    // Fresh client
    if (doc.isEmpty()) {
      doc.update(data);
      shadow.update(data);

      eventemitter.emit('update', doc.json());
    }
    // Offline 1, Client have been offline
    else if (counter > 0) {
      console.log('Reconnect'); // TODO Remove!
      // Offline 2, Create a temp document from json from server
      let tmp = new JSONDocument(data);
      // Offline 4, create diff between tmp and shadow
      let diff = tmp.diff(shadow);
      // Offline 6, patch document and shadow
      if (typeof diff !== 'undefined') {
        doc.patch(diff);
        shadow.patch(diff);
      }
      // Offline 8, send diff between document and shadow to server
      edits.sendDiff();

      eventemitter.emit('update', doc.json());
    }

    counter += 1;
  });

  let online = true;

  return {

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     * @returns {Boolean} false if the document is not changed and diff is not sent
     */

    // Step 1, diff is created
    update(json) {
      doc.update(json);

      if (online) {
        return edits.sendDiff();
      }
      return true;
    },

    /**
     * Merge instructions
     *
     * @method merge
     * @param {Object} json Instructions for the document
     * @returns {Boolean} false if the document is not changed and diff is not sent
     */

    merge(json) {
      doc.merge(json);

      if (online) {
        return edits.sendDiff();
      }
      return true;
    },

    /**
     * Listen for events
     *
     * ### Events:
     *
     * * update
     *
     * @method on
     * @param {String} event
     * @param {Function} listener
     */

    on(e, listener) {
      edits.eventemitter.on(e, listener);
    },

    /*
     * Only for testing
     */

    offline() {
      socket.removeAllListeners('DIFF');
      online = false;
    },

    /*
     * Only for testing
     */

    online() {
      edits = _edits(socket, doc, shadow, undefined, eventemitter);
      socket.emit('reconnect_for_testing', 'online');
      online = true;
    }
  };
};

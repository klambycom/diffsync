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
let websocket = require('./edits');
let EventEmitter = require('events').EventEmitter;

module.exports = function clients(socket, doc = new JSONDocument) {
  let shadow = new JSONDocument();
  let eventemitter = new EventEmitter();
  let edits = websocket(socket, doc, shadow, undefined, eventemitter);

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
    // Client have been offline
    else if (counter > 0) {
      let tmp = new JSONDocument(data);

      eventemitter.emit('update', doc.json());
    }

    counter++;
  });

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
      return edits.sendDiff();
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
      return edits.sendDiff();
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
    }
  };
};

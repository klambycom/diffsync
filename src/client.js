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
let websocket = require('./websocket');

module.exports = function (socket, doc = new JSONDocument) {
  let edits = websocket(socket, doc);

  return {

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     */

    update(json) {
      doc.update(json);
      edits.sendDiff();
    },

    /**
     * Merge instructions
     *
     * @method merge
     * @param {Object} json Instructions for the document
     */

    merge(json) {
      doc.merge(json);
      edits.sendDiff();
    },

    /**
     * Listen for events
     *
     * ### Events:
     *
     * * diff
     * * patch
     *
     * @method on
     * @param {String} event
     * @param {Function} listener
     */

    on: edits.eventemitter.on
  };
};

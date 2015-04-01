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

module.exports = function clients(socket, doc = new JSONDocument) {
  let edits = websocket(socket, doc);

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

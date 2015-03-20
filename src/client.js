/**
 * # Client(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

let Document = require('./document');
let websocket = require('./websocket');

module.exports = function (socket) {
  let doc = new Document();
  let edits = websocket(socket, doc);

  console.log('DOCUMENT', doc);
  //console.log('SHADOW', shadow);

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

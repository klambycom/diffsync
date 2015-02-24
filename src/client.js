/**
 * # Client
 */

/*! */

let Document = require('./document');
let websocket = require('./websocket');

module.exports = function () {
  let doc = new Document();
  let shadow = new Document();

  console.log('DOCUMENT', doc);
  console.log('SHADOW', shadow);

  websocket.onPatch(patch => {
    doc.patch(patch);
    shadow.patch(patch);
  });

  let sendDiff = function () {
    let diff = doc.diff(shadow);
    websocket.emit('DIFF', diff);
  };

  return {

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     */

    update(json) {
      doc.update(json);
      sendDiff();
    },

    /**
     * Merge instructions
     *
     * @method merge
     * @param {Object} json Instructions for the document
     */

    merge(json) {
      doc.merge(json);
      sendDiff();
    }
  };
};

/**
 * # Client(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* Optional param for creating the document
 */

/*! */

"use strict";

var JSONDocument = require("./document");
var websocket = require("./websocket");

module.exports = function clients(socket) {
  var doc = arguments[1] === undefined ? new JSONDocument() : arguments[1];

  var edits = websocket(socket, doc);

  return {

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     * @returns {Boolean} false if the document is not changed and diff is not sent
     */

    update: function update(json) {
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

    merge: function merge(json) {
      doc.merge(json);
      return edits.sendDiff();
    },

    /**
     * Listen for events
     *
     * ### Events:
     *
     * * diff
     * * patch
     * * update
     *
     * @method on
     * @param {String} event
     * @param {Function} listener
     */

    on: function on(e, listener) {
      edits.eventemitter.on(e, listener);
    }
  };
};
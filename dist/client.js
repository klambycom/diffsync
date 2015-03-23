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

module.exports = function (socket) {
  var doc = arguments[1] === undefined ? new JSONDocument() : arguments[1];

  var edits = websocket(socket, doc);

  return {

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     */

    update: function update(json) {
      doc.update(json);
      edits.sendDiff();
    },

    /**
     * Merge instructions
     *
     * @method merge
     * @param {Object} json Instructions for the document
     */

    merge: function merge(json) {
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
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
var websocket = require("./edits");
var EventEmitter = require("events").EventEmitter;

module.exports = function clients(socket) {
  var doc = arguments[1] === undefined ? new JSONDocument() : arguments[1];

  var shadow = new JSONDocument();
  var eventemitter = new EventEmitter();
  var edits = websocket(socket, doc, shadow, undefined, eventemitter);

  // Update document when initial document is received
  socket.on("init_document", function (data) {
    doc.update(data);
    shadow.update(data);
    eventemitter.emit("update", doc.json());
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
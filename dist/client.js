"use strict";

/**
 * # Client(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

var Document = require("./document");
var websocket = require("./websocket");
var EventEmitter = require("events").EventEmitter;

module.exports = function (socket) {
  var doc = new Document();
  var eventemitter = new EventEmitter();
  var edits = websocket(socket, doc, eventemitter);

  console.log("DOCUMENT", doc);
  //console.log('SHADOW', shadow);

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

    on: function on(event, listener) {
      eventemitter.on(event, listener);
    }
  };
};
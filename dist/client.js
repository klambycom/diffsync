/**
 * # Client(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **JSONDocument** *doc* Optional param for creating the document
 */

/*! */

'use strict';

var JSONDocument = require('./document');
var websocket = require('./edits');
var EventEmitter = require('events').EventEmitter;

module.exports = function clients(socket) {
  var doc = arguments[1] === undefined ? new JSONDocument() : arguments[1];

  var shadow = new JSONDocument();
  var eventemitter = new EventEmitter();
  var edits = websocket(socket, doc, shadow, undefined, eventemitter);

  // Update document when initial document is received
  var counter = 0; // Ugly hack! Counter is needed because fired two times when
  // client reconnects. I don't know if it's because this is
  // inside socket.on('connect'). isEmpty() returns false
  // first than true. This will work for now.
  socket.on('init_document', function (data) {
    // Fresh client
    if (doc.isEmpty()) {
      doc.update(data);
      shadow.update(data);

      eventemitter.emit('update', doc.json());
    }
    // Offline 1, Client have been offline
    else if (counter > 0) {
      // Offline 2, Create a temp document from json from server
      var tmp = new JSONDocument(data);
      // Offline 4, create diff between tmp and shadow
      var diff = tmp.diff(shadow);
      // Offline 6, patch document and shadow
      if (typeof diff !== 'undefined') {
        doc.patch(diff);
        shadow.patch(diff);
      }
      // Offline 8, send diff between document and shadow to server
      edits.sendDiff();

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
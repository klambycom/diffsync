/**
 * # Server(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **Document** *doc* Optional param for creating the document
 */

/*! */

let Document = require('./document');
let websocket = require('./websocket');

module.exports = function (socket, doc = new Document) {
  let edits = websocket(socket, doc);

  return {
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

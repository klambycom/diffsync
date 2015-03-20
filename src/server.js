/**
 * # Server(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

let Document = require('./document');
let websocket = require('./websocket');

module.exports = function (socket) {
  let doc = new Document();
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

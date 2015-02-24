/**
 * # Server(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

let Document = require('./document');
let websocket = require('./websocket');
let EventEmitter = require('events').EventEmitter;

module.exports = function (socket) {
  let doc = new Document();
  let eventemitter = new EventEmitter();
  let edits = websocket(socket, doc, eventemitter);

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

    on(event, listener) {
      eventemitter.on(event, listener);
    }
  };
};

// TODO Remove this file? Rename? Edits?

/**
 * # Websocket(socket, doc)
 *
 * **Socket.io** *socket* 
 * **Document** *doc* 
 */

/*! */

let Document = require('./document');
let EventEmitter = require('events').EventEmitter;

module.exports = function (socket, doc) {
  let shadow = new Document();
  let ee = new EventEmitter();

  // Create patch from received diff
  socket.on('diff', function edits(data) {
    doc.patch(data);
    shadow.patch(data);
    ee.emit('patch', data);
  });

  return {

    /**
     * Send diff to clients/server
     *
     * @method sendDiff
     */

    sendDiff() {
      let diff = doc.diff(shadow);
      shadow.patch(diff);
      socket.emit('diff', diff);
      ee.emit('diff', diff);
    },

    /**
     * Send diff to clients/server
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
      ee.on(event, listener);
    }
  };
};

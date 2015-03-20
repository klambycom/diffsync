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

module.exports = function (socket, doc, eventemitter = new EventEmitter) {
  let shadow = new Document();

  // Create patch from received diff
  socket.on('diff', function edits(data) {
    doc.patch(data);
    shadow.patch(data);
    eventemitter.emit('patch', data);
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
      eventemitter.emit('diff', diff);
    },

    /**
     * ## eventemitter
     *
     * EventEmitter
     *
     * ### Events:
     *
     * * diff
     * * patch
     *
     * @type EventEmitter
     */

    eventemitter
  };
};

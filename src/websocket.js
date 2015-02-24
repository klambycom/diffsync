// TODO Remove this file? Rename? Edits?

/**
 * # Websocket(socket, doc)
 *
 * **Socket.io** *socket* 
 * **Document** *doc* 
 */

/*! */

let Document = require('./document');

module.exports = function (socket, doc) {
  let shadow = new Document();

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
    }
  };
};

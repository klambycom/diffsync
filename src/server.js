/**
 * # Server(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

let Document = require('./document');
//let websocket = require('./websocket');

module.exports = function (socket) {
  let doc = new Document();
  let shadow = new Document();

  socket.on('diff', function edits(data) {
    doc.patch(data);
    shadow.patch(data);
  });

  /*
  websocket.onPatch(patch => {
    doc.patch(patch);
    shadow.patch(patch);
  });
  */

  return {
  };
};

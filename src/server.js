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
  };
};

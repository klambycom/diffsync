"use strict";

/**
 * # Server(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

var Document = require("./document");
//let websocket = require('./websocket');

module.exports = function (socket) {
  var doc = new Document();
  var shadow = new Document();

  socket.on("diff", function (data) {
    doc.patch(data);
    shadow.patch(data);
  });

  /*
  websocket.onPatch(patch => {
    doc.patch(patch);
    shadow.patch(patch);
  });
  */

  return {};
};
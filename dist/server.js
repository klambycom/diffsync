"use strict";

/**
 * # Server(socket)
 *
 * **Socket.io** *socket* 
 */

/*! */

var Document = require("./document");
var websocket = require("./websocket");

module.exports = function (socket) {
  var doc = new Document();
  var edits = websocket(socket, doc);

  return {};
};
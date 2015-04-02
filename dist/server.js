/**
 * # Server(room, socket, client, doc)
 *
 * ### Params:
 *
 * **String** *room*
 * **Socket.io** *socket* 
 * **Redis client** *client* Optional
 * **JSONDocument** *doc* Optional param for creating the document
 */

/*! */

"use strict";

var JSONDocument = require("./document");
var websocket = require("./edits");
var storageDriver = require("./storage_driver.js");
var redis = require("redis");

module.exports = function server(room, socket) {
  var client = arguments[2] === undefined ? redis.createClient() : arguments[2];
  var doc = arguments[3] === undefined ? new JSONDocument() : arguments[3];

  var storage = storageDriver(room, client);
  var shadow = new JSONDocument();
  var edits = websocket(socket, doc, shadow, storage);

  // Disconnect from redis when user disconnects
  socket.on("disconnect", function () {
    return storage.disconnect();
  });

  // Join specified room
  socket.join(room);

  // Send document to client, when client connects
  storage.getJSON().then(function (data /*, error*/) {
    socket.emit("init_document", data);
    doc.update(data);
    shadow.update(data);
  });

  return {

    /**
     * Listen for events
     *
     * ### Events:
     *
     * * update
     *
     * @method on
     * @param {String} event
     * @param {Function} listener
     */

    on: edits.eventemitter.on
  };
};
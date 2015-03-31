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
var websocket = require("./websocket");
var storageDriver = require("./storage_driver.js");
var redis = require("redis");

module.exports = function server(room, socket) {
  var client = arguments[2] === undefined ? redis.createClient() : arguments[2];
  var doc = arguments[3] === undefined ? new JSONDocument() : arguments[3];

  var edits = websocket(socket, doc);
  var storage = storageDriver(room, client);

  // Join specified room
  socket.join(room);

  // Send document to client, when client connects
  storage.getJSON().then(function (data /*, error*/) {
    return socket.emit("init_document", data);
  });

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
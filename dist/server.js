/**
 * # Server(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **Redis client** *client* Optional
 * **JSONDocument** *doc* Optional param for creating the document
 */

/*! */

"use strict";

var JSONDocument = require("./document");
var websocket = require("./websocket");
var storage = require("./storage_driver.js");
var redis = require("redis");

module.exports = function (socket) {
  var client = arguments[1] === undefined ? redis.createClient() : arguments[1];
  var doc = arguments[2] === undefined ? new JSONDocument() : arguments[2];

  var edits = websocket(socket, doc);

  //console.log(socket.id);

  // Init storage
  storage.create("hash1", client);

  // Send document to client, when client connects
  storage.getJSON().then(function (data, error) {
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
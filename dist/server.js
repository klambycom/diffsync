/**
 * # Server(socket, doc)
 *
 * ### Params:
 *
 * **Socket.io** *socket* 
 * **Redis client** *redis* Optional
 * **JSONDocument** *doc* Optional param for creating the document
 */

/*! */

"use strict";

var JSONDocument = require("./document");
var websocket = require("./websocket");
var redis = require("redis");

module.exports = function (socket) {
  var redis = arguments[1] === undefined ? redis.createClient() : arguments[1];
  var doc = arguments[2] === undefined ? new JSONDocument() : arguments[2];
  return (function () {
    var edits = websocket(socket, doc);
    var storage = new StorageDriver("hash_code", redis);

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
  })();
};
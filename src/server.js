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

let JSONDocument = require('./document');
let websocket = require('./websocket');
let StorageDriver = require('./storage_driver.js');
let redis = require('redis');

module.exports = function (socket, redis = redis.createClient(), doc = new JSONDocument) {
  let edits = websocket(socket, doc);
  let storage = new StorageDriver('hash_code', redis);

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

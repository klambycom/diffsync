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

let JSONDocument = require('./document');
let websocket = require('./websocket');
let storageDriver = require('./storage_driver.js');
let redis = require('redis');

module.exports = function server(socket, client = redis.createClient(), doc = new JSONDocument) {
  let edits = websocket(socket, doc);
  let storage = storageDriver('hash1', client);

  //console.log(socket.id);

  // Send document to client, when client connects
  storage
    .getJSON()
    .then((data/*, error*/) => socket.emit('init_document', data));

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

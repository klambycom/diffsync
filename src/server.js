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

let JSONDocument = require('./document');
let _edits = require('./edits');
let storageDriver = require('./storage_driver.js');
let redis = require('redis');

module.exports = function server(room, socket, client = redis.createClient(), doc = new JSONDocument) {
  let storage = storageDriver(room, client);
  let shadow = new  JSONDocument();
  let edits = _edits(socket, doc, shadow, storage);

  // Join specified room
  socket.join(room);

  // Send document to client, when client connects
  storage
    .getJSON()
    .then((data/*, error*/) => {
      socket.emit('init_document', data);
      doc.update(data);
      shadow.update(data);
    });

  // Listen for changes on other clients
  let redisListener = redis.createClient();
  redisListener.on('message', (/*channel, message*/) => {
    // TODO Handle error!
    storage.getJSON().then((json, error) => {
      if (error) {
        console.log(error);
      } else {
        doc.update(json);
        edits.sendDiff();
      }
    });
  });
  redisListener.subscribe(room);

  // Disconnect from redis when user disconnects
  socket.on('disconnect', () => {
    redisListener.end();
    storage.disconnect();
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

/**
 * # StorageDriver
 *
 * @param {String} hash_code
 * @param {Redis client} client
 */

/*! */

/* global -Promise */
let Promise = require('promise');
let redis = require('redis');

module.exports = function storage(hash_code, client = redis.createClient()) {
  let create_promise = (callback, key = '') => {
    return new Promise((resolve, reject) => {
      let redisCallback = (err, data) => {
        if (err !== null) { reject(err); }
        else { resolve(callback(data)); }
      };
      if (key === '') { client.hgetall(hash_code, redisCallback); }
      else { client.hget(hash_code, key, redisCallback); }
    });
  };

  return {

    /**
     * Get name
     *
     * @method getName
     * @returns the name
     */

    getName() {
      return create_promise(data => data, 'name');
    },

    /**
     * Change name
     *
     * @method setName
     * @param {String} name
     */

    setName(name) {
      client.hset(hash_code, 'name', name);
    },

    /**
     * Get data
     *
     * @method getData
     * @returns the JSON
     */

    getData() {
      return create_promise(data => JSON.parse(data), 'data');
    },

    /**
     * Change data
     *
     * @method setData
     * @param {JSON} json
     */

    setData(json) {
      client.hset(hash_code, 'data', JSON.stringify(json));
    },

    /**
     * Set data from a document, getJSON() must be called first, because of
     * tests. I don't have time to do it better right now. Sorry.
     *
     * @method setFromDocument
     * @param {Document} doc
     */

    setFromDocument(doc) {
      let json = doc.json();

      if (json.name !== this.json_data.name) {
        this.setName(json.name);
      }

      if (Object.keys(json.data).length > 0) {
        this.setData(json.data);
      }
    },

    /**
     * Get JSON
     *
     * @method getJSON
     * @returns all data as JSON
     */

    getJSON() {
      return create_promise(data => {
        // Return empty document if nothing in db
        if (typeof data === 'undefined' || data === null) {
          return { name: '', data: {} };
        }

        // Else return the document
        data.data = JSON.parse(data.data);
        this.json_data = data;
        return data;
      });
    },

    publishDiff() {
      client.publish(hash_code, 'diff');
    },

    /**
     * Disconnects from redis
     *
     * @method disconnect
     */

    disconnect() {
      client.quit();
    }
  };
};

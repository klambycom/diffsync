/**
 * # StorageDriver
 */

/*! */

/* global -Promise */
let Promise = require('promise');
let redis = require('redis');

class StorageDriver {

}

let _hash_code;
let _client;

let _create_promise = (callback, key = '') => {
  return new Promise((resolve, reject) => {
    let redisCallback = (err, data) => {
      if (err !== null) { reject(err); }
      else { resolve(callback(data)); }
    };
    if (key === '') { _client.hgetall(_hash_code, redisCallback); }
    else { _client.hget(_hash_code, key, redisCallback); }
  });
};

module.exports = {

  /**
   * Initialize a storage driver for Redis
   *
   * @method create
   * @param {String} hash_code
   * @param {Redis client} client
   */

  create(hash_code, client = redis.createClient()) {
    _hash_code = hash_code;
    _client = client;
  },

  /**
   * Get name
   *
   * @method getName
   * @returns the name
   */

  getName() {
    return _create_promise(data => data, 'name');
  },

  /**
   * Change name
   *
   * @method setName
   * @param {String} name
   */

  setName(name) {
    _client.hset(_hash_code, 'name', name);
  },


  /**
   * Get data
   *
   * @method getData
   * @returns the JSON
   */

  getData() {
    return _create_promise(data => JSON.parse(data), 'data');
  },

  /**
   * Change data
   *
   * @method setData
   * @param {JSON} json
   */

  setData(json) {
    _client.hset(_hash_code, 'data', JSON.stringify(json));
  },

  /**
   * Get JSON
   *
   * @method getJSON
   * @returns all data as JSON
   */

  getJSON() {
    return _create_promise(data => {
      // TODO check if null
      data.data = JSON.parse(data.data);
      return data;
    });
  },

  /**
   * Disconnects from redis
   *
   * @method disconnect
   */

  disconnect() {
    _client.quit();
  }
};

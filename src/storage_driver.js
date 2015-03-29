/**
 * # StorageDriver
 */

/*! */

/* global -Promise */
let Promise = require('promise');
let redis = require('redis');

class StorageDriver {

  /**
   * Initialize a storage driver for Redis
   *
   * @method constructor
   * @param {String} hash_code
   * @param {Redis client} client
   */

  constructor(hash_code, client = redis.createClient()) {
    this.hash_code = hash_code;
    this.client = client;
  }

  /**
   * Change name
   *
   * @method setName
   * @param {String} name
   */

  setName(name) {
    this.client.hset(this.hash_code, 'name', name);
  }

  /**
   * Get name
   *
   * @method getName
   * @returns the name
   */

  getName() {
    return this._create_promise(data => data, 'name');
  }

  /**
   * Change data
   *
   * @method setData
   * @param {JSON} json
   */

  setData(json) {
    this.client.hset(this.hash_code, 'data', JSON.stringify(json));
  }

  /**
   * Get data
   *
   * @method getData
   * @returns the JSON
   */

  getData() {
    return this._create_promise(data => JSON.parse(data), 'data');
  }

  /**
   * Get JSON
   *
   * @method getJSON
   * @returns all data as JSON
   */

  getJSON() {
    return this._create_promise(data => {
      // TODO check if null
      data.data = JSON.parse(data.data);
      return data;
    });
  }

  /**
   * Disconnects from redis
   *
   * @method disconnect
   */

  disconnect() {
    this.client.quit();
  }

  _create_promise(callback, key = '') {
    return new Promise((resolve, reject) => {
      let redisCallback = (err, data) => {
        if (err !== null) { reject(err); }
        else { resolve(callback(data)); }
      };
      if (key === '') { this.client.hgetall(this.hash_code, redisCallback); }
      else { this.client.hget(this.hash_code, key, redisCallback); }
    });
  }
}

module.exports = StorageDriver;

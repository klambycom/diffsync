"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * # StorageDriver
 */

/*! */

/* global -Promise */
var Promise = require("promise");
var redis = require("redis");

var StorageDriver = function StorageDriver() {
  _classCallCheck(this, StorageDriver);
};

var _hash_code = undefined;
var _client = undefined;

var _create_promise = function (callback) {
  var key = arguments[1] === undefined ? "" : arguments[1];

  return new Promise(function (resolve, reject) {
    var redisCallback = function (err, data) {
      if (err !== null) {
        reject(err);
      } else {
        resolve(callback(data));
      }
    };
    if (key === "") {
      _client.hgetall(_hash_code, redisCallback);
    } else {
      _client.hget(_hash_code, key, redisCallback);
    }
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

  create: function create(hash_code) {
    var client = arguments[1] === undefined ? redis.createClient() : arguments[1];

    _hash_code = hash_code;
    _client = client;
  },

  /**
   * Get name
   *
   * @method getName
   * @returns the name
   */

  getName: function getName() {
    return _create_promise(function (data) {
      return data;
    }, "name");
  },

  /**
   * Change name
   *
   * @method setName
   * @param {String} name
   */

  setName: function setName(name) {
    _client.hset(_hash_code, "name", name);
  },

  /**
   * Get data
   *
   * @method getData
   * @returns the JSON
   */

  getData: function getData() {
    return _create_promise(function (data) {
      return JSON.parse(data);
    }, "data");
  },

  /**
   * Change data
   *
   * @method setData
   * @param {JSON} json
   */

  setData: function setData(json) {
    _client.hset(_hash_code, "data", JSON.stringify(json));
  },

  /**
   * Get JSON
   *
   * @method getJSON
   * @returns all data as JSON
   */

  getJSON: function getJSON() {
    return _create_promise(function (data) {
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

  disconnect: function disconnect() {
    _client.quit();
  }
};
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * # StorageDriver
 */

/*! */

/* global -Promise */
var Promise = require("promise");
var redis = require("redis");

var StorageDriver = (function () {

  /**
   * Initialize a storage driver for Redis
   *
   * @method constructor
   * @param {String} hash_code
   * @param {Redis client} client
   */

  function StorageDriver(hash_code) {
    var client = arguments[1] === undefined ? redis.createClient() : arguments[1];

    _classCallCheck(this, StorageDriver);

    this.hash_code = hash_code;
    this.client = client;
  }

  _createClass(StorageDriver, {
    setName: {

      /**
       * Change name
       *
       * @method setName
       * @param {String} name
       */

      value: function setName(name) {
        this.client.hset(this.hash_code, "name", name);
      }
    },
    getName: {

      /**
       * Get name
       *
       * @method getName
       * @returns the name
       */

      value: function getName() {
        return this._create_promise(function (data) {
          return data;
        }, "name");
      }
    },
    setData: {

      /**
       * Change data
       *
       * @method setData
       * @param {JSON} json
       */

      value: function setData(json) {
        this.client.hset(this.hash_code, "data", JSON.stringify(json));
      }
    },
    getData: {

      /**
       * Get data
       *
       * @method getData
       * @returns the JSON
       */

      value: function getData() {
        return this._create_promise(function (data) {
          return JSON.parse(data);
        }, "data");
      }
    },
    getJSON: {

      /**
       * Get JSON
       *
       * @method getJSON
       * @returns all data as JSON
       */

      value: function getJSON() {
        return this._create_promise(function (data) {
          data.data = JSON.parse(data.data);
          return data;
        });
      }
    },
    disconnect: {

      /**
       * Disconnects from redis
       *
       * @method disconnect
       */

      value: function disconnect() {
        this.client.quit();
      }
    },
    _create_promise: {
      value: function _create_promise(callback) {
        var _this = this;

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
            _this.client.hgetall(_this.hash_code, redisCallback);
          } else {
            _this.client.hget(_this.hash_code, key, redisCallback);
          }
        });
      }
    }
  });

  return StorageDriver;
})();

module.exports = StorageDriver;
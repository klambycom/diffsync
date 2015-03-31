/**
 * # StorageDriver
 *
 * @param {String} hash_code
 * @param {Redis client} client
 */

/*! */

/* global -Promise */
"use strict";

var Promise = require("promise");
var redis = require("redis");

module.exports = function storageDriver(hash_code) {
  var client = arguments[1] === undefined ? redis.createClient() : arguments[1];

  var create_promise = function (callback) {
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
        client.hgetall(hash_code, redisCallback);
      } else {
        client.hget(hash_code, key, redisCallback);
      }
    });
  };

  return {

    /**
     * Get name
     *
     * @method getName
     * @returns the name
     */

    getName: function getName() {
      return create_promise(function (data) {
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
      client.hset(hash_code, "name", name);
    },

    /**
     * Get data
     *
     * @method getData
     * @returns the JSON
     */

    getData: function getData() {
      return create_promise(function (data) {
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
      client.hset(hash_code, "data", JSON.stringify(json));
    },

    /**
     * Get JSON
     *
     * @method getJSON
     * @returns all data as JSON
     */

    getJSON: function getJSON() {
      return create_promise(function (data) {
        // Return empty document if nothing in db
        if (typeof data === "undefined" || data === null) {
          return { name: "", data: {} };
        }

        // Else return the document
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
      client.quit();
    }
  };
};
/**
 * # StorageDriver
 */

/*! */

/* global -Promise */
"use strict";

var Promise = require("promise");

module.exports = {

  /**
   * Initialize a storage driver for Redis
   *
   * @method redis
   */

  redis: function redis() {
    return {
      _initStorage: function _initStorage() {
        return new Promise(function (resolve, reject) {
          if (false) {
            reject({});
          } else {
            resolve({});
          }
        });
      },

      get: function get() {
        return new Promise(function (resolve, reject) {
          if (false) {
            reject({});
          } else {
            resolve({});
          }
        });
      },

      set: function set() {
        return new Promise(function (resolve, reject) {
          if (false) {
            reject({});
          } else {
            resolve({});
          }
        });
      }
    };
  }
};
/*options*/ /*data, patch*/
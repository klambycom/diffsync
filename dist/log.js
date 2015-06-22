"use strict";

module.exports = function (id) {
  return function (text) {
    var error = arguments[1] === undefined ? false : arguments[1];

    console.log("" + new Date() + " " + text + " (" + id + ")");
  };
};
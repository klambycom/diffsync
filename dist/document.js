"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * # JSONDocument
 *
 * Document and shadow.
 */

/*! */

var diffpatch = require("jsondiffpatch").create();

var JSONDocument = (function () {
  /**
   * @method constructor
   * @param {Object} json Information about and instructions for the document
   */

  function JSONDocument() {
    var json = arguments[0] === undefined ? {} : arguments[0];
    _classCallCheck(this, JSONDocument);

    this.json = json;
  }

  _prototypeProperties(JSONDocument, null, {
    update: {

      /**
       * Update the whole document
       *
       * @method update
       * @param {Object} json Information about and instructions for the document
       */

      value: function update() {
        var json = arguments[0] === undefined ? {} : arguments[0];
        this.json = json;
      },
      writable: true,
      configurable: true
    },
    merge: {

      /**
       * Merge instructions
       *
       * @method merge
       * @param {Object} json Instructions for the document
       */

      value: function merge() {
        var json = arguments[0] === undefined ? {} : arguments[0];
        // TODO Test if i can use of instead of in (and hasOwnProperty)
        for (var attr in json) {
          if (json.hasOwnProperty(attr)) {
            this.json[attr] = json[attr];
          }
        }
      },
      writable: true,
      configurable: true
    },
    patch: {

      /**
       * @method patch
       * @param {Object} patch Patch from jsondiffpatch
       */

      value: function patch(patch) {
        diffpatch.patch(this.json, patch);
      },
      writable: true,
      configurable: true
    },
    diff: {

      /**
       * @method diff
       * @param {JSONDocument} shadow The shadow of this document
       * @return {Object} Diff created by jsondiffpatch
       */

      value: function diff(shadow) {
        return diffpatch.diff(shadow.json, this.json);
      },
      writable: true,
      configurable: true
    }
  });

  return JSONDocument;
})();

module.exports = JSONDocument;
'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/**
 * # JSONDocument
 *
 * Document and shadow.
 */

/*! */

var diffpatch = require('jsondiffpatch').create();

var cloneObject = function cloneObject(json) {
  return JSON.parse(JSON.stringify(json));
};

var JSONDocument = (function () {

  /**
   * @method constructor
   * @param {Object} json Information about and instructions for the document
   */

  function JSONDocument() {
    var json = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, JSONDocument);

    this.json_data = cloneObject(json);
  }

  _createClass(JSONDocument, [{
    key: 'update',

    /**
     * Update the whole document
     *
     * @method update
     * @param {Object} json Information about and instructions for the document
     */

    value: function update() {
      var json = arguments[0] === undefined ? {} : arguments[0];

      this.json_data = cloneObject(json);
    }
  }, {
    key: 'isEmpty',

    /**
     * Check if the document is empty
     *
     * @method isEmpty
     * @return {Boolean} true if empty
     */
    value: function isEmpty() {
      return Object.keys(this.json_data).length === 0;
    }
  }, {
    key: 'merge',

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
          this.json_data[attr] = json[attr];
        }
      }
    }
  }, {
    key: 'patch',

    /**
     * Patch the document using jsondiffpatch
     *
     * @method patch
     * @param {Object} patch Patch from jsondiffpatch
     */

    value: (function (_patch) {
      function patch(_x) {
        return _patch.apply(this, arguments);
      }

      patch.toString = function () {
        return _patch.toString();
      };

      return patch;
    })(function (patch) {
      if (typeof patch !== 'undefined' && patch !== null) {
        diffpatch.patch(this.json_data, patch);
      }
    })
  }, {
    key: 'diff',

    /**
     * Create a diff using jsondiffpatch
     *
     * @method diff
     * @param {JSONDocument} shadow The shadow of this document
     * @return {Object} Diff created by jsondiffpatch
     */

    value: function diff(shadow) {
      return diffpatch.diff(shadow.json_data, this.json_data);
    }
  }, {
    key: 'json',

    /**
     * Get JSON
     *
     * #### Example output:
     *
     * ```javascript
     * {
     *   'name': 'fil1',
     *   'data': {
     *     'ett': 1,
     *     'tva': 'two',
     *     'tre': [1, 1, 1]
     *   }
     * }
     * ```
     *
     * @method json
     * @return {JSON} the document as JSON
     */

    value: function json() {
      return cloneObject(this.json_data);
    }
  }]);

  return JSONDocument;
})();

module.exports = JSONDocument;
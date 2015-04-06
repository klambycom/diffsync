/**
 * # JSONDocument
 *
 * Document and shadow.
 */

/*! */

let diffpatch = require('jsondiffpatch').create();

let cloneObject = json => JSON.parse(JSON.stringify(json));

class JSONDocument {

  /**
   * @method constructor
   * @param {Object} json Information about and instructions for the document
   */

  constructor(json = {}) {
    this.json_data = cloneObject(json);
  }

  /**
   * Update the whole document
   *
   * @method update
   * @param {Object} json Information about and instructions for the document
   */

  update(json = {}) {
    this.json_data = cloneObject(json);
  }

  isEmpty() {
    return Object.keys(this.json_data).length === 0;
  }

  /**
   * Merge instructions
   *
   * @method merge
   * @param {Object} json Instructions for the document
   */

  merge(json = {}) {
    // TODO Test if i can use of instead of in (and hasOwnProperty)
    for (let attr in json) {
      if (json.hasOwnProperty(attr)) {
        this.json_data[attr] = json[attr];
      }
    }
  }

  /**
   * Patch the document using jsondiffpatch
   *
   * @method patch
   * @param {Object} patch Patch from jsondiffpatch
   */

  patch(patch) {
    if (typeof patch !== 'undefined' && patch !== null) {
      diffpatch.patch(this.json_data, patch);
    }
  }

  /**
   * Create a diff using jsondiffpatch
   *
   * @method diff
   * @param {JSONDocument} shadow The shadow of this document
   * @return {Object} Diff created by jsondiffpatch
   */

  diff(shadow) {
    return diffpatch.diff(shadow.json_data, this.json_data);
  }

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

  json() {
    return cloneObject(this.json_data);
  }
}

module.exports = JSONDocument;

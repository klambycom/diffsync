/**
 * # JSONDocument
 *
 * Document and shadow.
 */

/*! */

let diffpatch = require('jsondiffpatch').create();

class JSONDocument {

  /**
   * @method constructor
   * @param {Object} json Information about and instructions for the document
   */

  constructor(json = {}) {
    this.json = json;
  }

  /**
   * Update the whole document
   *
   * @method update
   * @param {Object} json Information about and instructions for the document
   */

  update(json = {}) {
    this.json = json;
  }

  /**
   * Merge instructions
   *
   * @method merge
   * @param {Object} json Instructions for the document
   */

  merge(json = {}) {
    for (let attr in json) {
      this.json[attr] = json[attr];
    }
  }

  /**
   * @method patch
   * @param {Object} patch Patch from jsondiffpatch
   */

  patch(patch) {
    diffpatch.patch(this.json, patch);
  }

  /**
   * @method diff
   * @param {JSONDocument} shadow The shadow of this document
   * @return {Object} Diff created by jsondiffpatch
   */

  diff(shadow) {
    return diffpatch.diff(shadow.json, this.json);
  }
}

module.exports = JSONDocument;

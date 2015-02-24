/**
 * # Document
 *
 * Document and shadow.
 */

/*! */

let diffpatch = require('jsondiffpatch').create();

class Document {
  constructor(json = {}) {
    this.json = json;
  }

  /**
   * @method update
   */

  update(json = {}) {
    this.json = json;
  }

  /**
   * @method merge
   */

  merge(json = {}) {
    for (let attr in json) {
      this.json[attr] = json[attr];
    }
  }

  /**
   * @method patch
   */

  patch(patch) {
    diffpatch.patch(this.json, patch);
  }

  /**
   * @method diff
   */

  diff(shadow) {
    return diffpatch.diff(shadow.json, this.json);
  }
}

module.exports = Document;

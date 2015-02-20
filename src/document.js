let diffpatch = require('jsondiffpatch').create();

class Document {
  constructor(json = {}) {
    this.json = json;
  }

  update(json = {}) {
    this.json = json;
  }

  merge(json = {}) {
    for (let attr in json) {
      this.json[attr] = json[attr];
    }
  }

  patch(patch) {
    diffpatch.patch(this.json, patch);
  }

  diff(shadow) {
    return diffpatch.diff(shadow.json, this.json);
  }
}

module.exports = Document;

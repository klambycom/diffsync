// TODO Document is document or shadow

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

  patch() {
    // TODO Needed? Probably!
  }

  diff(shadow) {
    // TODO Create diff between this and another document, JSON or text.
  }
}

module.exports = Document;

class NotNode
{
  constructor(name) {
    this.localName = name
  }

  attributes = []

  childNodes = []

  append(...items) {

  }

  setAttribute(name, value) {

  }

  get outerHTML() {
    return '<' + this.localName + '></' + this.localName + '>'
  }
}

module.exports = NotNode

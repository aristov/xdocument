const DocumentFragment = require('./DocumentFragment')
const Element = require('./Element')

module.exports = {
  createDocumentFragment() {
    return new DocumentFragment
  },
  createElement(localName) {
    const node = new Element
    node.localName = localName
    return node
  },
  createTextNode(data) {
    return data
  }
}

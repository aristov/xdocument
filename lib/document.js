const DocumentFragment = require('./DocumentFragment')
const Element = require('./Element')

exports.createElement = function(localName) {
  const node = new Element
  node.localName = localName
  return node
}

exports.createTextNode = function(data) {
  return data
}

exports.createDocumentFragment = function() {
  return new DocumentFragment
}

const Element = require('./Element')

module.exports = {
  createElement(localName) {
    return new Element(localName)
  },
}

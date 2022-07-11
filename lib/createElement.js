const attrNameMap = require('./attrNameMap')
const noEndTag = require('./noEndTag')

const proto = {
  setAttribute(name, value) {
    this.attributes[name] = value
  },

  removeAttribute(name) {
    delete this.attributes[name]
  },

  append(...items) {
    this.childNodes.push(...items)
  },

  get outerHTML() {
    const { localName, attributes } = this
    let result = '<' + localName
    let name, value
    for(name in attributes) {
      value = attributes[name]
      result += ' ' + name + '="' + (value === true ? '"' : value + '"')
    }
    result += '>'
    if(noEndTag[localName]) {
      return result
    }
    let child
    for(child of this.childNodes) {
      result += child.outerHTML || child
    }
    return result + '</' + localName + '>'
  },
}

for(const name in attrNameMap) {
  const attr = attrNameMap[name]
  Object.defineProperty(proto, name, {
    configurable : true,
    get() {
      return this.attributes[attr]
    },
    set(value) {
      this.attributes[attr] = value
    },
  })
}

module.exports = localName => {
  const node = Object.create(proto)
  node.localName = localName
  node.attributes = {}
  node.childNodes = []
  return node
}

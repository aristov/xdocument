const Node = require('./Node')
const shortTags = require('./shortTags')
const attrNameMap = require('./attrNameMap')

class Element extends Node
{
  attributes = {}

  setAttribute(name, value) {
    this.attributes[name] = value
  }

  get outerHTML() {
    const { localName, attributes } = this
    let result = '<' + localName
    let name, value
    for(name in attributes) {
      value = attributes[name]
      result += ` ${ name }="${ value === true ? '' : value }"`
    }
    result += '>'
    if(shortTags[localName]) {
      return result
    }
    let child
    for(child of this.childNodes) {
      result += child.outerHTML || child
    }
    return result + '</' + localName + '>'
  }
}

for(const name in attrNameMap) {
  const attr = attrNameMap[name]
  Object.defineProperty(Element.prototype, name, {
    configurable : true,
    get() {
      return this.attributes[attr]
    },
    set(value) {
      this.attributes[attr] = value
    },
  })
}

module.exports = Element

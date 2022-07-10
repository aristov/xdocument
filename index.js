class NotNode
{
  constructor(name) {
    this.localName = name
  }

  attributes = {}

  childNodes = []

  append(...items) {
    this.childNodes.push(...items)
  }

  setAttribute(name, value) {
    this.attributes[name] = value
  }

  get outerHTML() {
    const { localName, attributes } = this
    let result = '<' + localName
    let name
    for(name in attributes) {
      result += ` ${ name }="${ attributes[name] }"`
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

const shortTags = {
  area : true,
  base : true,
  br : true,
  col : true,
  embed : true,
  hr : true,
  img : true,
  input : true,
  link : true,
  meta : true,
  source : true,
  track : true,
  wbr : true,
}

module.exports = NotNode

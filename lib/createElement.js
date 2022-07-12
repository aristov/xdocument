const attrNameMap = require('./attrNameMap')
const noEndTag = require('./noEndTag')

const rt = {
  '"' : '&quot;',
  '&' : '&amp;',
  '<' : '&lt;',
  '>' : '&gt;',
}
const replace = c => rt[c]
const ATTR_RE = /["&]/g
const TEXT_RE = /[<>&]/g
const BR_RE = /\n/g

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
    const { localName, attributes, childNodes, innerHTML, innerText } = this
    let startTag = '<' + localName
    let name, value
    for(name in attributes) {
      value = attributes[name]
      if(value === null || value === false) {
        continue
      }
      startTag += ' ' + name + '="'
      if(value === true) {
        startTag += '"'
        continue
      }
      if(typeof value === 'string' && ATTR_RE.test(value)) {
        value = value.replace(ATTR_RE, replace)
      }
      startTag += value + '"'
    }
    startTag += '>'
    if(noEndTag[localName]) {
      return startTag
    }
    let endTag = '</' + localName + '>'
    let html = ''
    if(innerHTML) {
      return startTag + innerHTML + endTag
    }
    else if(innerText) {
      html = BR_RE.test(innerText) ?
        innerText.replace(BR_RE, '<br>') :
        innerText
      return startTag + html + endTag
    }
    let child, outerHTML
    for(child of childNodes) {
      outerHTML = child.outerHTML
      if(outerHTML) {
        html += outerHTML
      }
      else if(typeof child === 'string' && TEXT_RE.test(child)) {
        html += child.replace(TEXT_RE, replace)
      }
      else html += child
    }
    return startTag + html + endTag
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

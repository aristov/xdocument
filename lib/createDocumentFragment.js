const proto = {
  append(...items) {
    this.childNodes.push(...items)
  },

  get outerHTML() {
    let result = ''
    let child
    for(child of this.childNodes) {
      result += child.outerHTML || child
    }
    return result
  },
}

module.exports = () => {
  const node = Object.create(proto)
  node.childNodes = []
  return node
}

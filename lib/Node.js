class Node
{
  childNodes = []

  append(...items) {
    const childNodes = this.childNodes
    for(const item of items) {
      if(item.isFragment) {
        childNodes.push(...item.childNodes)
      }
      else childNodes.push(item)
    }
  }
}

module.exports = Node

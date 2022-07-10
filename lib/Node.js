class Node
{
  childNodes = []

  append(...items) {
    for(const item of items) {
      if(item.isFragment) {
        this.childNodes.push(...item.childNodes)
      }
      else this.childNodes.push(item)
    }
  }
}

module.exports = Node

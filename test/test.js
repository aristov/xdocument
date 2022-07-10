const test = require('ava')
const NotNode = require('..')

test('test #1', t => {
  const node = new NotNode('div')

  t.is(node.localName, 'div')
  t.is(node.outerHTML, '<div></div>')
})

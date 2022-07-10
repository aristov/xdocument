const test = require('ava')
const NotNode = require('..')

test('test #1', t => {
  const node = new NotNode('div')

  t.is(node.localName, 'div')
  t.is(node.outerHTML, '<div></div>')
})

test('test #2', t => {
  const node = new NotNode('link')

  t.is(node.localName, 'link')
  t.is(node.outerHTML, '<link>')
})

test('test #3', t => {
  const node = new NotNode('div')
  node.setAttribute('id', '123')

  t.is(node.outerHTML, '<div id="123"></div>')
})

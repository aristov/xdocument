const test = require('ava')
const NotNode = require('..')

test('localName', t => {
  const node = new NotNode('div')

  t.is(node.localName, 'div')
  t.is(node.outerHTML, '<div></div>')
})

test('short tag', t => {
  const node = new NotNode('link')

  t.is(node.localName, 'link')
  t.is(node.outerHTML, '<link>')
})

test('setAttribute', t => {
  const node = new NotNode('div')
  node.setAttribute('id', '123')

  t.is(node.outerHTML, '<div id="123"></div>')
})

test('append', t => {
  const node = new NotNode('div')
  const child = new NotNode('span')
  child.append('test')
  node.append(child)

  t.is(child.childNodes[0], 'test')
  t.is(node.childNodes[0], child)
  t.is(node.outerHTML, '<div><span>test</span></div>')
})

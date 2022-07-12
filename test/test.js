const test = require('ava')
const {
  createElement,
  createDocumentFragment,
  createTextNode,
} = require('../lib/document')

test('localName', t => {
  const node = createElement('div')

  t.is(node.localName, 'div')
  t.is(node.outerHTML, '<div></div>')
})

test('no end tag', t => {
  const node = createElement('link')

  t.is(node.localName, 'link')
  t.is(node.outerHTML, '<link>')
})

test('setAttribute', t => {
  const node = createElement('div')
  node.setAttribute('id', '123')

  t.is(node.outerHTML, '<div id="123"></div>')
})

test('append', t => {
  const node = createElement('div')
  const child = createElement('span')
  child.append('test')
  node.append(child)

  t.is(child.childNodes[0], 'test')
  t.is(node.childNodes[0], child)
  t.is(node.outerHTML, '<div><span>test</span></div>')
})

test('href', t => {
  const node = createElement('a')
  node.href = 'http://example.com'
  node.append('Example')

  t.is(node.href, 'http://example.com')
  t.is(node.outerHTML, '<a href="http://example.com">Example</a>')
})

test('hidden', t => {
  const node = createElement('div')
  node.hidden = true
  node.append('Test')

  t.is(node.hidden, true)
  t.is(node.outerHTML, '<div hidden="">Test</div>')
})

test('defaultValue', t => {
  const node = createElement('input')
  node.defaultValue = 'qwerty'

  t.is(node.defaultValue, 'qwerty')
  t.is(node.outerHTML, '<input value="qwerty">')
})

test('escaping strings', t => {
  const result = createElement('div')
  result.title = '"&'
  result.append('<>&')

  t.is(result.outerHTML, '<div title="&quot;&amp;">&lt;&gt;&amp;</div>')
})

test('innerHTML', t => {
  const node = createElement('div')
  node.innerHTML = '<span>content</span>'

  t.is(node.outerHTML, '<div><span>content</span></div>')
})

test('innerText', t => {
  const node = createElement('div')
  node.innerText = 'foo\nbar'

  t.is(node.outerHTML, '<div>foo<br>bar</div>')
})


test('createDocumentFragment', t => {
  const node = createElement('div')
  const child = createElement('br')
  const fragment = createDocumentFragment()
  const hr = createElement('hr')

  fragment.append('foo', hr, 'bar')
  node.append(child, fragment)

  t.is(node.outerHTML, '<div><br>foo<hr>bar</div>')
})

test('createTextNode', t => {
  const node = createElement('div')
  const text = createTextNode('Hello world!')
  node.append(text)

  t.is(text, 'Hello world!')
  t.is(node.outerHTML, '<div>Hello world!</div>')
})

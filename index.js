/**
 * @module xdocument
 * @author Vyacheslav Aristov <vv.aristov@gmail.com>
 */
if(typeof document === 'undefined') {
  // Calling via eval() prevents extraction when using a module bundler
  module.exports = eval('require("./lib/document")')
}
else module.exports = document

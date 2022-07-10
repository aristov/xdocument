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
    let name, value
    for(name in attributes) {
      value = attributes[name]
      result += ` ${ name }="${ value === true ? '' : value }"`
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

const attrNameMap = {
  abbr : 'abbr',
  accept : 'accept',
  acceptCharset : 'accept-charset',
  accessKey : 'accesskey',
  action : 'action',
  allowFullScreen : 'allowfullscreen',
  allowPaymentRequest : 'allowpaymentrequest',
  alt : 'alt',
  async : 'async',
  autocomplete : 'autocomplete',
  autofocus : 'autofocus',
  autoplay : 'autoplay',
  charset : 'charset',
  cite : 'cite',
  className : 'class',
  colSpan : 'colspan',
  cols : 'cols',
  content : 'content',
  contentEditable : 'contenteditable',
  controls : 'controls',
  coords : 'coords',
  crossOrigin : 'crossorigin',
  currentTime : 'currenttime',
  data : 'data',
  dateTime : 'datetime',
  default : 'default',
  defaultChecked : 'checked',
  defaultMuted : 'muted',
  defaultSelected : 'selected',
  defaultValue : 'value',
  defer : 'defer',
  dir : 'dir',
  dirName : 'dirname',
  disabled : 'disabled',
  download : 'download',
  enctype : 'enctype',
  files : 'files',
  formAction : 'formaction',
  formEnctype : 'formenctype',
  formMethod : 'formmethod',
  formNoValidate : 'formnovalidate',
  formTarget : 'formtarget',
  hash : 'hash',
  headers : 'headers',
  height : 'height',
  hidden : 'hidden',
  high : 'high',
  host : 'host',
  hostname : 'hostname',
  href : 'href',
  hreflang : 'hreflang',
  htmlFor : 'for',
  httpEquiv : 'http-equiv',
  id : 'id',
  inputMode : 'inputmode',
  integrity : 'integrity',
  isMap : 'ismap',
  kind : 'kind',
  label : 'label',
  lang : 'lang',
  loop : 'loop',
  low : 'low',
  max : 'max',
  maxLength : 'maxlength',
  media : 'media',
  method : 'method',
  min : 'min',
  minLength : 'minlength',
  multiple : 'multiple',
  muted : 'muted',
  name : 'name',
  noModule : 'nomodule',
  noValidate : 'novalidate',
  nonce : 'nonce',
  open : 'open',
  optimum : 'optimum',
  password : 'password',
  pathname : 'pathname',
  pattern : 'pattern',
  placeholder : 'placeholder',
  port : 'port',
  poster : 'poster',
  preload : 'preload',
  protocol : 'protocol',
  readOnly : 'readonly',
  referrerPolicy : 'referrerpolicy',
  rel : 'rel',
  required : 'required',
  rev : 'rev',
  reversed : 'reversed',
  rowSpan : 'rowspan',
  rows : 'rows',
  scope : 'scope',
  search : 'search',
  shape : 'shape',
  size : 'size',
  sizes : 'sizes',
  span : 'span',
  src : 'src',
  srcObject : 'srcobject',
  srcdoc : 'srcdoc',
  srclang : 'srclang',
  srcset : 'srcset',
  start : 'start',
  step : 'step',
  tabIndex : 'tabindex',
  target : 'target',
  text : 'text',
  title : 'title',
  translate : 'translate',
  type : 'type',
  typeMustMatch : 'typemustmatch',
  useMap : 'usemap',
  username : 'username',
  volume : 'volume',
  width : 'width',
  wrap : 'wrap',
}

for(const name in attrNameMap) {
  const attr = attrNameMap[name]
  Object.defineProperty(NotNode.prototype, name, {
    configurable : true,
    get() {
      return this.attributes[attr]
    },
    set(value) {
      this.attributes[attr] = value
    },
  })
}

module.exports = NotNode

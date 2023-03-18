import { template } from './template/WindowTemplate.js'
let zValue = 0

class SubWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  updatezValueHandler () {
    this.style.zIndex = zValue
    zValue++
  }

  onMouseEvent (event) {
    event.preventDefault()
    const icon = this.shadowRoot.querySelector('#icon')
    const name = this.shadowRoot.querySelector('#name')
    const close = this.shadowRoot.querySelector('#imgClose')
    const appHeader = this.shadowRoot.querySelector('#appheader')
    if (event.composedPath()[0] === appHeader ||
    event.composedPath()[0] === icon ||
     event.composedPath()[0] === name) {
      this.windowFocusHandler()
      this.updatezValueHandler()
      this.shadowRoot.querySelector('#appheader').style.cursor = 'grabbing'
      this.pos3 = event.clientX; this.pos4 = event.clientY
      event.target.onmouseup = this.dragEndHander
      event.target.onmousemove = this.dragStarterHandler
    }
    if (event.composedPath()[0] === close) {
      this.detachHandler()
    }
  }

  dragStarterHandler (event) {
    event.preventDefault()
    this.pos1 = this.pos3 - event.clientX; this.pos2 = this.pos4 - event.clientY
    this.pos3 = event.clientX; this.pos4 = event.clientY
    event.target.style.top = `${event.target.offsetTop - this.pos2}px`
    event.target.style.left = `${event.target.offsetLeft - this.pos1}px`
  }

  dragEndHander (event) {
    this.cancelWindowFocusHandler()
    this.shadowRoot.querySelector('#appheader').style.cursor = 'grab'
    event.target.onmouseup = null
    event.target.onmousemove = null
  }

  windowFocusHandler () {
    this.style.border = 'solid 8px rgb(220,220,220)'
  }

  cancelWindowFocusHandler () {
    this.style.border = ''
  }

  connectedCallback () {
    this.pos1 = 0; this.pos2 = 0; this.pos3 = 0; this.pos4 = 0
    this.addEventListener('mousedown', this.onMouseEvent)
    this.updatezValueHandler()
  }

  detachHandler () {
    this.removeEventListener('mousedown', this.onMouseEvent)
    this.remove()
  }

  static get zValue () {
    return zValue
  }

  static set zValue (value) {
    zValue += value
  }

  set component (component) {
    this.shadowRoot.querySelector('#app').appendChild(component)
  }

  get component () {
  }

  set icon (path) {
    const img = document.createElement('IMG')
    img.src = path
    this.shadowRoot.querySelector('#icon').appendChild(img)
  }

  get icon () {
  }

  set name (name) {
    this.shadowRoot.querySelector('#name').textContent = name
  }

  get name () {
    return this.shadowRoot.querySelector('#name').textContent
  }
}

window.customElements.define('sub-window', SubWindow)

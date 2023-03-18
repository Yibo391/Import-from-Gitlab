const windowTemplate = document.createElement('template')
windowTemplate.innerHTML = `
  <div id='window'>
    <div id='titlebar'>
      <img>
      <span id='title'>Placeholder title</span>
      <span id='buttons'>
        <span class='windowButton' id='maximizeButton'> &#9744; </span>
        <span class='windowButton' id='closeButton'> X </span>
      </span>
    </div>

    <div id='content'>
      <span id='resizeBars'>
        <span class='right' id='ew-resizer'>&nbsp;</span>
        <span id='ns-resizer'>&nbsp;</span>
        <span id='ne-resizer'>&nbsp;</span>
      </span>
    </div>
  </div>
  `

const stylesheet = document.createElement('template')
stylesheet.innerHTML = `
  <link rel='stylesheet' type='text/css' href='../css/window.css' />
  `

/**
 * Used to hold a js application
 * The application window is draggable and resizable, and has methods to handle focus (on top)
 */
class ApplicationWindow extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this._prevWindowState = undefined
    this._isMaximized = false
    this._blockToggleMaximizeWindow = false // used because a touchpad seems to want to trigger drag when double clicking
  }

  connectedCallback () {
    this.shadowRoot.appendChild(stylesheet.content.cloneNode(true))
    this.shadowRoot.appendChild(windowTemplate.content.cloneNode(true))
    this._appContent = this.shadowRoot.querySelector('#content')
    // this._appContent.style.visibility = 'hidden' /// -------------------------------------------------------------------------------------------------------------------
    this.appWindow = this.shadowRoot.querySelector('#window')

    this.appWindow.querySelector('#titlebar').addEventListener('mousedown', e => this._moveWindow(e))
    this.appWindow.querySelector('#titlebar').addEventListener('dblclick', () => this.toggleMaximizeWindow())
    this.shadowRoot.querySelector('#closeButton').addEventListener('click', () => this._closeWindow())
    this.shadowRoot.querySelector('#maximizeButton').addEventListener('click', () => this.toggleMaximizeWindow())
    this.appWindow.querySelector('#resizeBars').addEventListener('mousedown', e => this.resizeW(e))
  }

  _moveWindow (e) {
    e.preventDefault() // prevents dragging behaviours on the icon (img)
    if (e.target.parentElement.id === 'buttons') {
      // if a window button was pressed
      return
    }

    let xPos1, xPos2, yPos1, yPos2
    xPos2 = e.clientX
    yPos2 = e.clientY

    const dragListener = e => drag(e)
    window.addEventListener('mousemove', dragListener)
    const removeDragListeners = () => {
      window.removeEventListener('mousemove', dragListener)
      window.removeEventListener('mouseup', removeDragListeners)
    }
    window.addEventListener('mouseup', removeDragListeners)

    const element = this.shadowRoot.querySelector('#window')
    const drag = e => {
      if (this._isMaximized) {
        this.toggleMaximizeWindow(false)
        this._blockToggleMaximizeWindow = true
      }

      xPos1 = xPos2 - e.clientX
      yPos1 = yPos2 - e.clientY
      xPos2 = e.clientX
      yPos2 = e.clientY

      // new window position vertically clamped to desktop space
      element.style.top = Math.min(window.innerHeight - 80, Math.max(0, element.offsetTop - yPos1)) + 'px'
      element.style.left = (element.offsetLeft - xPos1) + 'px'
    }
  }

  resizeW (e) {
    let resizeListener

    if (e.target.id === 'ne-resizer') {
      resizeListener = (e) => startResize(e, 'bottom right')
    } else if (e.target.id === 'ns-resizer') {
      resizeListener = (e) => startResize(e, 'bottom')
    } else {
      resizeListener = (e) => startResize(e, 'right')
    }

    window.addEventListener('mousemove', resizeListener)
    const removeResizeListeners = () => {
      window.removeEventListener('mousemove', resizeListener)
      window.removeEventListener('mouseup', removeResizeListeners)
    }
    window.addEventListener('mouseup', removeResizeListeners)

    const element = this.appWindow
    const startResize = (e, corners) => {
      if (this._isMaximized) {
        this._isMaximized = false
      }
      if (corners.includes('right')) {
        element.style.width = (e.pageX - element.getBoundingClientRect().left) + 'px'
      }
      if (corners.includes('bottom')) {
        element.style.height = (e.pageY - element.getBoundingClientRect().top) + 'px'
      }
      if (corners.includes('left')) {
        element.style.width = (element.getBoundingClientRect().left - e.pageX) + 'px'
      }
    }
  }

  /**
   * Toggles betwemaximizes window size to fill the desktop, or go back to previous position and size
   *  @param {boolean} useSavedPosition whether the previous position should be restored or not (false when toggled on dragging window)
   */
  toggleMaximizeWindow (useSavedPosition = true) {
    if (this._blockToggleMaximizeWindow) {
      this._blockToggleMaximizeWindow = false
      return
    }

    if (!this._isMaximized) {
      this._prevWindowState = { top: this.appWindow.style.top, left: this.appWindow.style.left, width: this.appWindow.style.width, height: this.appWindow.style.height }

      const fillDesktop = () => {
        this.appWindow.style.top = '0px'
        this.appWindow.style.left = '0px'

        this.appWindow.style.width = window.innerWidth + 'px'
        this.appWindow.style.height = (window.innerHeight - 53) + 'px'
      }
      window.onresize = () => fillDesktop()
      fillDesktop()
    } else {
      window.onresize = undefined
      if (useSavedPosition) {
        this.appWindow.style.top = this._prevWindowState.top
        this.appWindow.style.left = this._prevWindowState.left
      }
      this.appWindow.style.width = this._prevWindowState.width
      this.appWindow.style.height = this._prevWindowState.height
    }
    this._isMaximized = !this._isMaximized
  }

  /**
   * Sets the content of the window
   * @param {HTMLElement} app
   * @param {string} iconUrl
   */
  setApplication (app, iconUrl) {
    this._app = app

    this._appContent.appendChild(app)
    this.appWindow.querySelector('#titlebar').querySelector('img').setAttribute('src', iconUrl)
  }

  /**
   * Sets title for the window
   * @param {string} title
   */
  setTitle (title) {
    this.shadowRoot.querySelector('#title').innerText = title
  }

  _closeWindow () {
    this.remove()
    // this.dispatchEvent(new window.CustomEvent('windowClosed', { detail: this }))
  }

  /**
   * Used to set window position top and left offset, e.g. to stack windows
   * @param {number} offset
   */
  setOffsetPosition (offset) {
    this.appWindow.style.top = offset + 'px'
    this.appWindow.style.left = offset + 'px'
  }

  /**
   * Used to put the window on top and mark it to indicate it's focused
   * Dispatches a custom event 'windowgotfocus' for apps that wants to use it
   * @param {number} zIndex
   */
  setFocus (zIndex) {
    this._app.dispatchEvent(new window.CustomEvent('windowgotfocus'))

    this.appWindow.style.setProperty('z-index', zIndex)
    this.shadowRoot.querySelector('#titlebar').classList.add('focused')
  }

  /**
   * Removes the focus indication of the window
   * Dispatches a custom event 'windowlostfocus' for apps that wants to use it
   */
  unsetFocus () {
    this._app.dispatchEvent(new window.CustomEvent('windowlostfocus'))

    this.shadowRoot.querySelector('#titlebar').classList.remove('focused')
  }

  /**
   * Returns the z-index of the window
   */
  getLayer () {
    return this.appWindow.style.getPropertyValue('z-index')
  }
}

window.customElements.define('application-window', ApplicationWindow)

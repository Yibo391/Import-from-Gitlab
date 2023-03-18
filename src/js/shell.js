import './application-window.js'
import '../apps/memory-game/app.js'
import '../apps/chat-app/app.js'
import '../apps/calendar-app/app.js'

const iconSnippet = document.createElement('img')
iconSnippet.className = 'icon'
iconSnippet.setAttribute('tabindex', '0')

const desktopSnippet = document.createElement('div')
desktopSnippet.id = 'desktop'

const bottombarSnippet = document.createElement('div')
bottombarSnippet.id = 'bottombar'

const stylesheet = document.createElement('template')
stylesheet.innerHTML = `
  <link rel='stylesheet' type='text/css' href='../css/shell.css' />
`

const appsPath = '/apps'
const iconName = 'icon.png'

const newWindowOffset = 10

/**
 * Shell application that can run other (unmodified) applications in windows
 * Apps should be added in the /apps folder and have an app.js as base class, and an icon.png
 * To add an app, import it here and use the _insertAppShortcut method in connectedCallback
 * Windows can be closed by pressing shift + F4
 * Window maximization can be toggled by pressing shift + F11
 */
class PersonalWebDesktop extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.appendChild(stylesheet.content)
    this.shadowRoot.appendChild(desktopSnippet)
    this.shadowRoot.appendChild(bottombarSnippet)
    this._desktop = this.shadowRoot.querySelector('#desktop')
    this._bottombar = this.shadowRoot.querySelector('#bottombar')
    this._bottombar.addEventListener('click', e => {
      if (e.target.classList.contains('icon')) {
        this._openApplication(e.target)
      }
    })

    this._bottombar.addEventListener('keydown', e => {
      if (e.target.classList.contains('icon') && e.key === 'Enter') {
        this._openApplication(e.target)
      }
    })

    this._insertAppShortcut('memory-game', 'Memory')
    this._insertAppShortcut('chat-app', 'Chat')
    this._insertAppShortcut('calendar-app', 'Calendar')
    this._highestLayer = 1

    document.addEventListener('keydown', e => {
      if (e.key === 'F4' && e.shiftKey) {
        this._closeFocusedWindow()
      } else if (e.key === 'F11' && e.shiftKey) {
        this._maximizeFocusedWindow()
      }
    })

    window.addEventListener('contextmenu', e => {
      e.preventDefault()
    })
  }

  /**
   * Puts a shortcut icon in the bottombar that opens the application its tied to when clicked
   * @param {string} appName the folder that contains the app must be named this
   * @param {string} titleName What name to display in the title bar of the window
   */
  _insertAppShortcut (appName, titleName) {
    const icon = iconSnippet.cloneNode(true)
    const iconUrl = appsPath + '/' + appName + '/' + iconName
    icon.setAttribute('id', appName)
    icon.setAttribute('src', iconUrl)
    icon.setAttribute('title', titleName)
    this._bottombar.appendChild(icon)
  }

  /**
   * Opens the application in a window
   * @param {HTMLElement} shortcut the icon shortcut containing parameters for app, title, and iconUrl
   */
  _openApplication (icon) {
    const appName = icon.getAttribute('id')
    const titleName = icon.getAttribute('title')
    const iconUrl = icon.getAttribute('src')

    const appWindow = document.createElement('application-window')
    this._desktop.appendChild(appWindow)
    appWindow.setApplication(document.createElement(appName), iconUrl)

    appWindow.setAttribute('nr', this._desktop.children.length)
    appWindow.setTitle(titleName)
    appWindow.setOffsetPosition((this._desktop.children.length - 1) * newWindowOffset)
    this._selectWindow(appWindow, true)
    appWindow.addEventListener('mousedown', () => this._selectWindow(appWindow, true))
  }

  /**
   * Closes the window that has focus
   */
  _closeFocusedWindow () {
    if (!this._focusedWindow) {
      return
    }

    this._focusedWindow._closeWindow()
    let newFocusWindow
    let highestLayerFound = 0
    for (const appWindow of this._desktop.children) {
      const layer = appWindow.getLayer()
      if (layer > highestLayerFound) {
        highestLayerFound = layer
        newFocusWindow = appWindow
      }
    }
    if (newFocusWindow) {
      this._selectWindow(newFocusWindow, false)
    } else {
      this._focusedWindow = undefined
    }
  }

  _maximizeFocusedWindow () {
    if (!this._focusedWindow) {
      return
    }

    this._focusedWindow.toggleMaximizeWindow()
  }

  /**
   * Puts focus on a specific window
   * @param {HTMLElement} appWindow
   * @param {boolean} increaseLayer
   */
  _selectWindow (appWindow, increaseLayer) {
    if (this._focusedWindow !== appWindow) {
      if (this._focusedWindow) {
        this._focusedWindow.unsetFocus()
      }
      this._focusedWindow = appWindow
      appWindow.setFocus(this._highestLayer)
      if (increaseLayer) {
        this._highestLayer++
      }
    }
  }
}

window.customElements.define('personal-web-desktop', PersonalWebDesktop)

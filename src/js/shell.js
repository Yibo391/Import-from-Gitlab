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

class PersonalWebDesktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.setupElements()
    this.registerEventListeners()
    this.createAppShortcuts()
    this.createDateTimeDisplay()
    this.createDesktopIcons()
  }
  // { name: 'Folder', iconUrl: 'image/icon_calendar.png', action: this.openCalendar },
  // { name: 'File', iconUrl: 'image/icon.png', action: this.openFile },
  // { name: 'Calculator', iconUrl: 'image/info.png', action: this.openCalculator }

createDesktopIcons() {
  const icons = [
    { appName: 'memory-game', titleName: 'Memory', iconUrl: appsPath + '/memory-game/icon.png' },
    { appName: 'chat-app', titleName: 'Chat', iconUrl: appsPath + '/chat-app/icon.png' },
    { appName: 'calendar-app', titleName: 'Calendar', iconUrl: appsPath + '/calendar-app/icon.png' }
  ];

  icons.forEach((icon, index) => {
    const desktopIcon = iconSnippet.cloneNode(true);
    desktopIcon.setAttribute('id', icon.appName);
    desktopIcon.setAttribute('src', icon.iconUrl);
    desktopIcon.setAttribute('title', icon.titleName);
    desktopIcon.classList.add('desktop-icon');
    desktopIcon.classList.add('desktop-icon-hover'); // Add new class for hover effect
    desktopIcon.style.top = `${20 + (index * 100)}px`;
    this._desktop.appendChild(desktopIcon);
    desktopIcon.addEventListener('click', () => this.openApplication(desktopIcon));
  });
}


  setupElements () {
    this.shadowRoot.appendChild(stylesheet.content)
    this.shadowRoot.appendChild(desktopSnippet)
    this.shadowRoot.appendChild(bottombarSnippet)
    this._desktop = this.shadowRoot.querySelector('#desktop')
    this._bottombar = this.shadowRoot.querySelector('#bottombar')
  }

  registerEventListeners () {
    this._bottombar.addEventListener('click', e => {
      if (e.target.classList.contains('icon')) {
        this.openApplication(e.target)
      }
    })
  }

  createDateTimeDisplay () {
    this._dateTimeDisplay = document.createElement('div')
    this._dateTimeDisplay.id = 'dateTimeDisplay'
    this._bottombar.appendChild(this._dateTimeDisplay)
    this.updateDateTime()
  }

  updateDateTime () {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const date = now.toLocaleDateString()
    this._dateTimeDisplay.textContent = `${date} ${hours}:${minutes}`
    setTimeout(() => this.updateDateTime(), 1000 * 60 - now.getSeconds() * 1000) // Update every minute
  }

  createAppShortcuts () {
    const shortcuts = [
      { appName: 'memory-game', titleName: 'Memory' },
      { appName: 'chat-app', titleName: 'Chat' },
      { appName: 'calendar-app', titleName: 'Calendar' }
    ]

    shortcuts.forEach(shortcut => {
      const icon = iconSnippet.cloneNode(true)
      const iconUrl = appsPath + '/' + shortcut.appName + '/' + iconName
      icon.setAttribute('id', shortcut.appName)
      icon.setAttribute('src', iconUrl)
      icon.setAttribute('title', shortcut.titleName)
      this._bottombar.appendChild(icon)
    })

    this._highestLayer = 1
  }

  openApplication (icon) {
    const appName = icon.getAttribute('id')
    const titleName = icon.getAttribute('title')
    const iconUrl = icon.getAttribute('src')

    const appWindow = document.createElement('application-window')
    this._desktop.appendChild(appWindow)
    appWindow.setApplication(document.createElement(appName), iconUrl)

    appWindow.setAttribute('nr', this._desktop.children.length)
    appWindow.setTitle(titleName)
    appWindow.setOffsetPosition((this._desktop.children.length - 1) * newWindowOffset)
    this.setFocusedWindow(appWindow, true)
    appWindow.addEventListener('mousedown', () => this.setFocusedWindow(appWindow, true))
  }

  closeFocusedWindow () {
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
      this.setFocusedWindow(newFocusWindow, false)
    } else {
      this._focusedWindow = undefined
    }
  }

  maximizeWindow () {
    if (!this._focusedWindow) {
      return
    }

    this._focusedWindow.toggleMaximizeWindow()
  }

  setFocusedWindow (appWindow, increaseLayer) {
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

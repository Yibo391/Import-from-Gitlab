import { makeDraggable } from './app.js'
import { updateTime } from './time.js'
setInterval(updateTime, 1000)

// Add a click event listener to each app icon
document.querySelectorAll('.app').forEach((app) => {
  app.addEventListener('click', () => {
    // Get the app id from the data-app-id attribute
    const appId = app.getAttribute('data-app-id')
    // Create a new window element
    const windowElement = document.createElement('div')
    windowElement.classList.add('window')
    windowElement.setAttribute('id', appId)
    windowElement.setAttribute('draggable', 'true')
    windowElement.addEventListener('click', () => {
      document.querySelectorAll('.window.selected').forEach((selectedWindow) => {
        selectedWindow.classList.remove('selected')
      })
      windowElement.classList.add('selected')
    })
    // Add a title bar to the window element
    const titleBar = document.createElement('div')
    titleBar.classList.add('title-bar')
    // Add a title element to the title bar
    const title = document.createElement('div')
    title.classList.add('title')
    title.innerText = appId
    titleBar.appendChild(title)
    // Add a close button to the title bar
    const closeButton = document.createElement('button')
    closeButton.innerText = 'X'
    closeButton.addEventListener('click', () => {
      // Remove the close button click event listener
      closeButton.removeEventListener('click', () => {})
      // Remove the window element from the DOM
      windowElement.remove()
    })
    titleBar.appendChild(closeButton)
    // Add the title bar to the window element
    windowElement.appendChild(titleBar)
    // Append the window element to the app container
    // Append the window element to the app container
    document.getElementById('app-container').appendChild(windowElement)

    // Get the dimensions of the window element
    // eslint-disable-next-line no-unused-vars
    const windowRect = windowElement.getBoundingClientRect()
    makeDraggable(windowElement, windowRect.left, windowRect.top)
  })
})

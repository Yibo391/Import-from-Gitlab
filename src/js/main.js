/* eslint-disable jsdoc/require-param-type */
/* eslint-disable jsdoc/require-param-description */
// Update the time display every second
setInterval(updateTime, 1000)

/**
 *
 */
function updateTime () {
  const date = new Date()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  document.getElementById('hours').innerText = hours
  document.getElementById('minutes').innerText = minutes
  document.getElementById('seconds').innerText = seconds
}

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
    document.getElementById('app-container').appendChild(windowElement)

    // Add event listeners for the drag and drop functionality
    windowElement.addEventListener('dragstart', (event) => {
      // Set the data that
      event.dataTransfer.setData('text/plain', appId)
    })

    windowElement.addEventListener('drag', (event) => {
      // Update the position of the window element during the drag
      windowElement.style.left = `${event.clientX - windowElement.offsetWidth / 2}px`
      windowElement.style.top = `${event.clientY - windowElement.offsetHeight / 2}px`
    })

    windowElement.addEventListener('dragend', (event) => {
      // Calculate the new position of the window element based on the mouse position
      const newLeft = event.clientX - windowElement.offsetWidth / 2
      // Check if the new position is within the bounds of the screen
      if (newLeft > 0 && newLeft + windowElement.offsetWidth < window.innerWidth) {
        // Update the position of the window element
        windowElement.style.left = `${newLeft}px`
        windowElement.style.top = '0px'
      }
    })
  })
})

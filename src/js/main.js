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
    windowElement.addEventListener('dragstart', (event) => {
      console.log('DRAG START', event)

      // Get original position
      const style = window.getComputedStyle(event.target, null)
      const startX = parseInt(style.getPropertyValue('left'), 10) - event.clientX
      const startY = parseInt(style.getPropertyValue('top'), 10) - event.clientY
      const start = {
        posX: startX,
        posY: startY
      }

      // Save the position in the dataTransfer
      event.dataTransfer.setData('application/json', JSON.stringify(start))
      console.log('Start position', start)
    })

    window.addEventListener('dragover', (event) => {
      event.preventDefault()
    })

    window.addEventListener('drop', (event) => {
      // Get the position of the dragged

      // Get the position of the dragged element and where the drop was
      const start = JSON.parse(event.dataTransfer.getData('application/json'))
      const dropX = event.clientX
      const dropY = event.clientY

      // Move element position from start to drop
      windowElement.style.left = (dropX + start.posX) + 'px'
      windowElement.style.top = (dropY + start.posY) + 'px'
    })
  })
})

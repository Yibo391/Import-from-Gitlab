/**
 *
 * @param windowElement
 */
export function makeDraggable (windowElement) {
  let offsetX
  let offsetY
  windowElement.addEventListener('mousedown', (event) => {
    offsetX = event.clientX - windowElement.offsetLeft
    offsetY = event.clientY - windowElement.offsetTop
  })
  windowElement.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id)
  })
  window.addEventListener('dragover', (event) => {
    event.preventDefault()
  })
  window.addEventListener('drop', (event) => {
    event.preventDefault()
    const draggedElement = document.getElementById(event.dataTransfer.getData('text/plain'))
    draggedElement.style.left = (event.clientX - offsetX) + 'px'
    draggedElement.style.top = (event.clientY - offsetY) + 'px'
  })
}

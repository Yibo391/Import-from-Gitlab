import './SeparateWindow.js'
import './applications/ChatApp.js'
import './applications/Quiz.js'
import './applications/Calculator.js'
import chatIcon from './../img/desktop/messenger.png'
import memoryIcon from './../img/desktop/memory.png'
import quizIcon from './../img/desktop/quiz.png'
import MemoryGame from './applications/Memory.js'

document.getElementById('selectedGrid').style.display = 'none'
const dt = new Date()
document.getElementById('hourOfStartup').innerHTML = dt.getHours() + ':' + dt.getMinutes()
document.getElementById('dateOfStartup').innerHTML = dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate()
const chatApp = document.getElementById('chatApp')
const memoryApp = document.getElementById('memoryApp')
const calculatorApp = document.getElementById('calculatorApp')
const quizApp = document.getElementById('quizApp')

chatApp.addEventListener('click', runChatApp)
chatApp.addEventListener('dblclick', removeChatWindows())
quizApp.addEventListener('click', startQuiz)
quizApp.addEventListener('dblclick', removeQuizWindows())
calculatorApp.addEventListener('click', startCalculator)
quizApp.addEventListener('dblclick', removeCalculators())

/**
 * The function used to start up the quiz application (work in progress).
 */
function startQuiz () {
  const quizWindow = document.createElement('sub-window')
  quizWindow.className = 'app-sub-window'
  quizWindow.id = 'quizAppId'
  quizWindow.style.setProperty('height', '720px')
  quizWindow.style.setProperty('width', '460px')
  document.querySelector('#container').prepend(quizWindow)
  quizWindow.icon = quizIcon
  quizWindow.name = 'Quiz'
  quizWindow.component = document.createElement('quiz-app')
}

/**
 * The function used to remove all respective quiz windows.
 */
function removeQuizWindows () {
  const windows = document.querySelectorAll('#quizAppId')
  windows.forEach((window) => {
    window.remove()
  })
}

/**
 * The function used to start up the calculator app (primitive).
 */
function startCalculator () {
  const calculatorWindow = document.createElement('sub-window')
  calculatorWindow.className = 'app-sub-window'
  calculatorWindow.id = 'calculatorAppId'
  calculatorWindow.style.setProperty('height', '420px')
  calculatorWindow.style.setProperty('width', '400px')
  document.querySelector('#container').prepend(calculatorWindow)
  calculatorWindow.icon = quizIcon
  calculatorWindow.name = 'Calculator'
  calculatorWindow.component = document.createElement('calculator-app')
}

/**
 * The function used to remove the calculator apps from the window.
 */
function removeCalculators () {
  const windows = document.querySelectorAll('#calculatorAppId')
  windows.forEach((window) => {
    window.remove()
  })
}

/**
 *
 * @param {number} rows The number of rows to be in the memory application.
 * @param {number} cols The number of columns to be in the memory application.
 */
function runMemoryGame (rows, cols) {
  const memoryWindow = document.createElement('sub-window')
  if (cols === 2) {
    memoryWindow.style.setProperty('width', '280px')
  }
  if (rows === 2) {
    memoryWindow.style.setProperty('height', '300px')
  }
  memoryWindow.className = 'app-sub-window'
  memoryWindow.id = 'memoryApp'
  document.querySelector('#container').prepend(memoryWindow)
  const template = document.querySelector('#memory-template').content.firstElementChild
  const container = template.cloneNode(true)
  const memoGame = new MemoryGame(rows, cols, container)
  memoryWindow.icon = memoryIcon
  memoryWindow.name = 'Memory'
  memoryWindow.component = container
  memoGame.init()
  memoryWindow.addEventListener('focus', function () {
    memoryWindow.addEventListener('keydown', toggleModal)
  })
}

const trapFocus = (element, prevFocusableElement = document.activeElement) => {
  const focusableEls = Array.from(
    element.querySelectorAll(
      '[href]'
    )
  )
  const firstFocusableEl = focusableEls[0]
  const lastFocusableEl = focusableEls[focusableEls.length - 1]
  let currentFocus = null
  firstFocusableEl.focus()
  currentFocus = firstFocusableEl
  const handleFocus = e => {
    e.preventDefault()
    if (focusableEls.includes(e.target)) {
      currentFocus = e.target
    } else {
      if (currentFocus === firstFocusableEl) {
        lastFocusableEl.focus()
      } else {
        firstFocusableEl.focus()
      }
      currentFocus = document.activeElement
    }
  }

  document.addEventListener('focus', handleFocus, true)
  return {
    onClose: () => {
      document.removeEventListener('focus', handleFocus, true)
      prevFocusableElement.focus()
    }
  }
}

const toggleModal = (e) => {
  const modal = document.querySelector('#memoryContainer')
  if (modal.style.display === 'none') {
    modal.style.display = 'block'
    trapFocus(modal)
  } else {
    modal.style.display = 'none'
    modal.onClose()
  }
}

/**
 * The function used to remove the memory windows off the main app.
 */
function removeMemoryWindows () {
  const windows = document.querySelectorAll('#memoryApp')
  windows.forEach((window) => {
    window.remove()
  })
}

/**
 * A function used to display a mini-menu to get a choice from the user regarding the size of the memory game.
 */
function checkForSize () {
  document.getElementById('selectedGrid').style.display = 'block'
}

document.getElementById('selectedGrid').addEventListener('click', function (event) {
  if (event.target && event.target.matches("input[type='radio']")) {
    processSelectedGrid()
  }
})

/**
 * A function to check what the user has picked for the memory game.
 */
function processSelectedGrid () {
  const inputs = document.getElementsByName('choices')
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      if (inputs[i].value === '2 x 2') {
        runMemoryGame(2, 2)
      }
      if (inputs[i].value === '2 x 4') {
        runMemoryGame(2, 4)
      }
      if (inputs[i].value === '4 x 4') {
        runMemoryGame(4, 4)
      }
    }
  }
  document.getElementById('selectedGrid').style.display = 'none'
}

memoryApp.addEventListener('click', checkForSize)
memoryApp.addEventListener('mousedown', function (e) {
  if (e.button === 1) {
    removeMemoryWindows()
  }
})

/**
 * The function to start up the chat application.
 */
function runChatApp () {
  const chatWindow = document.createElement('sub-window')
  chatWindow.className = 'app-sub-window'
  chatWindow.id = 'chatAppId'
  document.querySelector('#container').prepend(chatWindow)
  chatWindow.icon = chatIcon
  chatWindow.name = 'Messenger'
  chatWindow.component = document.createElement('chat-app')
}

/**
 * The function used to remove the chat windows off the main application.
 */
function removeChatWindows () {
  const windows = document.querySelectorAll('#chatAppId')
  windows.forEach((window) => {
    window.remove()
  })
}

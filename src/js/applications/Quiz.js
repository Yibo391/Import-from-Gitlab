import { template } from '../template/QuizTemplate.js'

class Quiz extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.answer = {}
    this.table = this.shadowRoot.getElementById('highScoreTable')
    this.answerButton = this.shadowRoot.getElementById('confirmAnswer')
    this.progressBarTag = this.shadowRoot.getElementById('progressBar')
    this.quizTimerTag = this.shadowRoot.getElementById('quizTimer')
    this.questionTag = this.shadowRoot.getElementById('question')
    this.playerAnswerTag = this.shadowRoot.getElementById('playerAnswer')
    this.playerAlternativeTag = this.shadowRoot.getElementById('playerAlternative')
    this.endGameTag = this.shadowRoot.getElementById('endGame')
    this.winnerPage = this.shadowRoot.getElementById('winner')
    this.checkTableBtn = this.shadowRoot.querySelector('#winner button')
    this.scorePageTag = this.shadowRoot.getElementById('scorePage')
    this.maxTime = 10
    this.startingURL = 'https://courselab.lnu.se/quiz/question/1'
    this.isOptional = false
    this.gap = 0
    this.cntDown = 0
    this.srvResp = null
    this.correctAnswers = 0
    this.passTime = 0
    this.userName = null
  }

  connectedCallback () {
    this.playerAlternativeTag.addEventListener('click', function (event) {
      if (event.target && event.target.matches("input[type='radio']")) {
        this.getRadioValue()
      }
    })

    this.answerButton.addEventListener('click', () => {
      this.progressBarTag.classList.remove('round-time-bar')
      this.stopTimer()
      let value
      if (this.isOptional === false) {
        value = this.shadowRoot.querySelector('.answer').value
      } else {
        this.shadowRoot.querySelectorAll('#radio').forEach(element => {
          if (element.checked) {
            value = element.value
          }
        })
        const divChoice = this.shadowRoot.querySelector('#playerAlternative')
        while (divChoice.firstChild) {
          divChoice.firstChild.remove()
        }
      }
      this.answer = {
        answer: value
      }
      this.processAnswer()
    })

    this.shadowRoot.getElementById('playerAnswer').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
        this.answerButton.click()
      }
    })

    this.shadowRoot.getElementById('chosenName').addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
        this.shadowRoot.getElementById('startButton').click()
      }
    })

    this.checkTableBtn.addEventListener('click', () => {
      this.showWinPage()
    })

    this.button = this.shadowRoot.getElementById('startButton')
    this.button.addEventListener('click', () => {
      this.userName = this.button.previousElementSibling.value
      this.startApplication()
    })
  }

  /**
   * This function hides all elements present in a container.
   *
   * @param {document} parent Container of the elements.
   */
  hideElements (parent) {
    const children = this.shadowRoot.querySelector(parent).children
    for (let i = 0; i < children.length; i++) {
      children[i].style.visibility = 'hidden'
      children[i].style.display = 'none'
      children[i].checked = false
    }
  }

  /**
   * Hides the content in the main page so to speak.
   */
  hideMainPage () {
    this.shadowRoot.getElementById('mainPage').style.display = 'none'
    this.shadowRoot.getElementById('startButton').style.display = 'none'
  }

  showQuestion = function (srvResp) {
    this.hideMainPage()
    this.shadowRoot.getElementById('mainHeader').style.visibility = 'visible'
    this.questionTag.style.visibility = 'visible'
    this.questionTag.style.display = 'block'
    this.questionTag.style.visibility = 'visible'
    this.answerButton.hidden = false
    this.playerAnswerTag.style.visibility = 'visible'
    this.playerAnswerTag.style.display = 'block'
    this.playerAnswerTag.value = ''
    const question = this.shadowRoot.getElementById('actualQuestion')
    question.textContent = srvResp.question
  }

  showAlternatives = function (alternatives) {
    this.playerAnswerTag.style.visibility = 'hidden'
    this.playerAnswerTag.style.display = 'none'
    this.answerButton.hidden = true
    this.playerAlternativeTag.style.visibility = 'visible'
    const alternativesLength = Object.keys(alternatives).length
    const divChoice = this.shadowRoot.querySelector('#playerAlternative')
    for (let index = 0; index < alternativesLength; index++) {
      const radio = document.createElement('input')
      radio.setAttribute('type', 'radio')
      radio.className = 'rad-input'
      radio.name = 'choices'
      radio.value = 'alt' + (index + 1)
      radio.id = 'radio' + (index + 1)
      divChoice.appendChild(radio)
      const label = document.createElement('label')
      label.id = 'label' + (index + 1)
      label.textContent = alternatives['alt' + (index + 1)]
      label.className = 'rad-label'
      const br = document.createElement('br')
      label.htmlFor = radio.id
      divChoice.appendChild(label)
      divChoice.appendChild(br)
    }
  }

  showGameOverPage () {
    this.hideElements('#mainDiv')
    this.endGameTag.style.visibility = 'visible'
    this.endGameTag.style.display = 'block'
  }

  startPageDisplay () {
    this.progressBarTag.classList.remove('round-time-bar')
    this.shadowRoot.getElementById('mainHeader').style.visibility = 'hidden'
    this.playerAlternativeTag.style.visibility = 'hidden'
    this.questionTag.style.visibility = 'hidden'
    this.playerAnswerTag.style.visibility = 'hidden'
    this.endGameTag.style.visibility = 'hidden'
    this.endGameTag.style.display = 'none'
    this.winnerPage.style.visibility = 'hidden'
    this.winnerPage.style.display = 'none'
    this.scorePageTag.style.visibility = 'hidden'
  }

  displayHighscore (newHighscore) {
    this.progressBarTag.classList.remove('round-time-bar')
    this.hideElements('#mainDiv')
    this.shadowRoot.querySelector('#scorePage').style.visibility = 'visible'
    this.shadowRoot.querySelector('#scorePage').style.display = 'block'
    let listPlayer = 5

    if (newHighscore.length < 5) {
      listPlayer = newHighscore.length
    }

    for (let i = 0; i < listPlayer; i++) {
      const tr = document.createElement('tr')
      const playerName = document.createElement('td')
      const timeElapsed = document.createElement('td')
      const playerScore = document.createElement('td')
      tr.appendChild(playerName)
      tr.appendChild(timeElapsed)
      tr.appendChild(playerScore)
      this.table.appendChild(tr)
      playerName.innerText = newHighscore[i].name
      timeElapsed.innerText = newHighscore[i].time
      playerScore.innerText = newHighscore[i].score
    }
    const button = document.createElement('button')
    button.textContent = 'Try again'
    this.shadowRoot.querySelector('#scorePage').appendChild(button)
  }

  /**
   * This async function is used to retrieve the question from the server.
   *
   * @param {URL} url The url that is used to retrieve the question.
   * @returns {JSON} Returns the response of the url in json if status code is OK.
   */
  async getQuestion (url) {
    const data = {
      method: 'GET'
    }
    const response = await fetch(url, data)
    if (response.ok) {
      return response.json()
    } else {
      this.gameOver()
    }
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  /**
   * This function is used to process the question after it has been retrieved.
   *
   * @param {URL} url The url that contains the question.
   */
  processQuestions (url) {
    this.getQuestion(url).then(result => {
      this.srvResp = result
      this.showQuestion(this.srvResp)
      if (!this.srvResp.alternatives) {
        this.shadowRoot.querySelector('#playerAlternative').style.visibility = 'hidden'
        this.shadowRoot.querySelector('#playerAnswer').style.visibility = 'visible'
      } else {
        this.isOptional = true
        this.showAlternatives(this.srvResp.alternatives)
      }
      this.startTimer(this.maxTime, this.quizTimerTag)
      this.quizTimerTag.style.display = 'none'
    })
  }

  /**
   * A function used to retrieve the value of the radio chosen by the player.
   */
  getRadioValue () {
    this.progressBarTag.classList.remove('round-time-bar')
    this.stopTimer()
    const inputs = this.shadowRoot.getElementsByName('choices')
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        this.answer = {
          answer: inputs[i].value
        }
      }
    }
    const divChoice = this.shadowRoot.querySelector('#playerAlternative')
    while (divChoice.firstChild) {
      divChoice.firstChild.remove()
    }
    this.processAnswer()
  }

  /**
   * Returns the response from the server in json in case the answer is correct.
   *
   * @returns {JSON} Server response.
   */
  async sendAnswer () {
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.answer)
    }
    try {
      const response = await fetch(this.srvResp.nextURL, config)
      if (response.ok) {
        return response.json()
      } else {
        this.gameOver()
      }
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  /**
   * This function displays a win page specific to the player.
   *
   * @param {string} msg The message that is to be displayed on the win page for the player.
   */
  winPlayerPage (msg) {
    this.shadowRoot.getElementById('mainHeader').style.visibility = 'hidden'
    this.playerAnswerTag.style.visibility = 'hidden'
    this.playerAnswerTag.style.display = 'none'
    this.questionTag.style.visibility = 'hidden'
    this.questionTag.style.display = 'none'
    const greetPlayerMsg = document.createElement('p')
    this.winnerPage.style.visibility = 'visible'
    this.winnerPage.style.display = 'block'
    const victoryMessage = document.createElement('p')
    victoryMessage.innerHTML = msg
    greetPlayerMsg.innerHTML = 'Congratulations ' + this.userName + '! ' + 'You completed the quiz in: ' + this.passTime + ' seconds.'
    this.checkTableBtn.parentNode.insertBefore(greetPlayerMsg, this.checkTableBtn.previousSibling)
    greetPlayerMsg.parentNode.insertBefore(victoryMessage, greetPlayerMsg)
  }

  /**
   * Depending on whether the server provides a nextURL or not, it processes it accordingly.
   */
  processAnswer () {
    this.sendAnswer().then(res => {
      this.srvResp = res
      this.correctAnswers++
      if (!this.srvResp.nextURL) {
        this.winPlayerPage(this.srvResp.message)
      } else if (this.srvResp.nextURL) {
        this.processQuestions(this.srvResp.nextURL)
        this.isOptional = false
      }
    })
  }

  /**
   * This function starts the timer and although hidden it runs on the same page as the question one.
   *
   * @param {number} duration Duration is the amount of time.
   * @param {document} display Display is the element that will be used to show the content.
   */
  startTimer (duration, display) {
    this.progressBarTag.classList.add('round-time-bar')
    this.cntDown = duration
    this.gap = setInterval(() => {
      display.textContent = this.cntDown
      if (--this.cntDown < 0) {
        this.gameOver()
      }
    }, 1000)
  }

  /**
   * Simply stops the timer that is going.
   */
  stopTimer () {
    this.progressBarTag.classList.remove('round-time-bar')
    clearInterval(this.gap)
    this.passTime += this.maxTime - this.cntDown
  }

  /**
   * Presents an endgame "page" to the user in case of an invalid answer.
   */
  gameOver () {
    this.progressBarTag.classList.remove('round-time-bar')
    this.showGameOverPage()
    const button = this.shadowRoot.querySelector('#endGame button')
    button.addEventListener('click', () => {
      document.location.reload()
    })
  }

  /**
   * Starts the application and shows a greeting page.
   */
  startApplication () {
    this.processQuestions(this.startingURL)
    this.sendAnswer()
    this.shadowRoot.querySelector('#endGame').style.visibility = 'hidden'
  }

  /**
   * Processing of the data that will be displayed once the game is won.
   */
  showWinPage () {
    this.progressBarTag.classList.remove('round-time-bar')
    this.winnerPage.style.visibility = 'hidden'
    this.winnerPage.style.display = 'none'
    let newHighscore
    if (!localStorage.highscore) {
      newHighscore = [{ name: this.userName, time: this.passTime, score: this.correctAnswers }]
    } else {
      newHighscore = JSON.parse(window.localStorage.highscore)
      newHighscore.push({ name: this.userName, time: this.passTime, score: this.correctAnswers })
    }
    this.correctAnswers = 0
    newHighscore = newHighscore.sort(function (n, m) {
      return n.time - m.time
    })
    localStorage.highscore = JSON.stringify(newHighscore)
    this.displayHighscore(newHighscore)
    this.shadowRoot.querySelector('#scorePage button').addEventListener('click', () => {
      document.location.reload()
    })
  }

  isEmpty (str) {
    return !str.trim().length
  }
}
window.customElements.define('quiz-app', Quiz)

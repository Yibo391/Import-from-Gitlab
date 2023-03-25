const showCardsTimeout = 1000 // delay (in ms) when presenting two open cards

const appName = 'memory-game'
const appPath = 'apps/' + appName
const imageFolder = appPath + '/images'

const styleTemplate = document.createElement('template')
styleTemplate.innerHTML = `
  <link rel='stylesheet' href='${appPath}/css/memory-style.css'>
`

const chooseSizeTemplate = document.createElement('template')
chooseSizeTemplate.innerHTML = `
  <form id='sizeForm'>
    Choose nr of cards: 
    <select id='nrOfCards'>
      <option>4</option>
      <option>6</option>
      <option>8</option>
      <option selected>12</option>
      <option>16</option>
    </select>
    <button type='submit'>Start game</button>
  </form>
`

const gameStatsSnippet = document.createElement('div')
gameStatsSnippet.innerHTML = `
  Time: <span id='clock'>0</span>
  <span class='right'> Nr of moves made:
    <span id='moves'>0</span>
  </span>
`

/**
 * Simple memory game
 * Use data-cols and data-rows to change the number of cards in the game
 * The maximum amount of cards is 16 and there has to be an even amount of cards
 * You can either use the mouse or the arrow keys + space to play
 */
class MemoryGame extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(styleTemplate.content.cloneNode(true))

    this.initializeVariables()
  }

  initializeVariables () {
    this._cards = [] // all cards
    this._openCards = [] // shown cards
    this._blockAction = false // used to (temporarily) block card interactions
    this._nrOfMoves = 0
    this._selectIndex = 0 // array index of selected card (keyboard navigation)
    this._clockInterval = undefined // clock interval
    this._movesCounter = undefined // where the nr of moves are shown
  }

  connectedCallback () {
    this.resize()
  }

  restart () {
    this.clear()
    this.resize()
  }

  resize () {
    this.shadowRoot.appendChild(chooseSizeTemplate.content.cloneNode(true))
    const form = this.shadowRoot.querySelector('#sizeForm')
    form.addEventListener('submit', e => {
      e.preventDefault()
      const size = parseInt(form.querySelector('#nrOfCards').value)
      this.start(size)
    })
  }

  start (size) {
    this.clear()

    this.initializeVariables()

    this._cols = size > 6 ? 4 : size === 6 ? 3 : 2
    const rows =
  size < 12
    ? 2
    : size === 16
      ? 4
      : 3

    this._totalCards = size
    this._cardsLeft = this._totalCards

    const totalPairs = this._totalCards / 2
    for (let i = 1; i <= totalPairs; i++) {
      [...Array(2)].forEach(() => {
        const card = this.createCardElement(i)
        this._cards.push(card)
      })
    }

    // shuffles cards and insert into game element with correct rows and columns
    this.shuffleCard()

    const table = document.createElement('table')
    table.className = 'cards'
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    this.shadowRoot.appendChild(table)

    let id = 0
    for (let row = 0; row < rows; row++) {
      const tRow = tr.cloneNode()
      table.appendChild(tRow);
      [...Array(this._cols)].forEach(() => {
        const tCell = td.cloneNode()
        tCell.setAttribute('id', 'card' + id++)
        tRow.appendChild(tCell)
        tCell.appendChild(this._cards.pop())
      })
    }

    table.addEventListener('mousedown', e => e.preventDefault()) // prevents drag behaviour of img
    table.addEventListener('click', e => this.touchCard(e.target))
    this.selectACard(0)

    // Clock and stats
    const gameStats = gameStatsSnippet.cloneNode(true)
    this._movesCounter = gameStats.querySelector('#moves')
    this._startTime = new Date().getTime()
    this._clockInterval = setInterval(() => {
      this._timeTaken = ((Date.now() - this._startTime) / 1000).toFixed(1)
      gameStats.querySelector('#clock').textContent = this._timeTaken
    }, 100)

    this.shadowRoot.appendChild(gameStats)
  }

  /**
   * Used during key navigation
   *
   * @param {number} indexChange how many array steps to take from the the previously selected card
   */
  selectACard (indexChange) {
    const newIndex = this._selectIndex + indexChange
    if (newIndex < 0 || newIndex > this._totalCards - 1) {
      return
    }

    const oldCard = this.getCard()
    oldCard.classList.remove('selectedCard')
    this._selectIndex = newIndex

    const newCard = this.getCard()
    newCard.classList.add('selectedCard')
  }

  /**
   * Gets the HTMLElement of this._selectindex
   *
   * @returns {HTMLElement} - The HTMLElement of this._selectindex
   */
  getCard () {
    return this.shadowRoot.querySelector('#card' + this._selectIndex)
  }

  /**
   * Shows card if allowed
   *
   * @param {HTMLElement} card this
   */
  touchCard (card) {
    const isBlocked = this._blockAction || !card.classList.contains('card') ||
                    card.getAttribute('data-enabled') === 'false' || this.isOver()
    if (isBlocked) {
      return
    }

    if (!this._openCards.includes(card) && this._openCards.length < 2) {
      this._openCards.push(card)
      this._nrOfMoves++
      this._movesCounter.textContent = this._nrOfMoves
      this.revealCard(card)
      if (this._openCards.length === 2) {
        const [firstCard, secondCard] = this._openCards
        if (firstCard.id === secondCard.id) {
        // shown cards match
          this._blockAction = true
          this._cardsLeft -= 2
          if (this.isOver()) {
            clearInterval(this._clockInterval) // stops the clock
          }
          setTimeout(() => {
            this.removeCard()
            this._openCards = []
            this._blockAction = false
          }, showCardsTimeout)
        } else {
        // shown cards do not match
          this._blockAction = true
          setTimeout(() => {
            this.hideCard()
            this._blockAction = false
          }, showCardsTimeout)
        }
      }
    }
  }

  /**
   * Ends the game and presents game over screen if all cards have been matched
   */
  checkGame () {
    if (this.isOver()) {
      this.clear()

      const slowTime = Math.pow(this._totalCards, 1.5)
      const tooManyMovesLimit = this._totalCards * 2
      let totalTime

      if (this._timeTaken > 60) {
        const minutes = Math.floor(this._timeTaken / 60)
        const seconds = this._timeTaken % 60
        totalTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds.toFixed(0)} minutes`
      } else {
        totalTime = `${this._timeTaken} seconds`
      }

      const resultPresentation = document.createElement('div')
      const performanceText =
      this._timeTaken < slowTime
        ? 'Great job, you'
        : 'You might not be the fastest, but you'
      const movesText =
      this._nrOfMoves < tooManyMovesLimit ? '!' : '. Maybe a little forgetful?'

      resultPresentation.innerText = `${performanceText} completed the game in ${totalTime} using ${this._nrOfMoves} moves${movesText}`

      this.shadowRoot.appendChild(resultPresentation.cloneNode(true))
      this.resize()
      this.shadowRoot.querySelector('button').innerText = 'Play again'
    }
  }

  clear () {
    while (this.shadowRoot.firstElementChild !== this.shadowRoot.lastElementChild) {
      this.shadowRoot.lastChild.remove()
    }
  }

  isOver () {
    return this._cardsLeft === 0
  }

  /**
   * Removes shown cards
   */
  removeCard () {
    for (const card of this._openCards) {
      this.discardCard(card)
    }
    this.checkGame()
  }

  hideCard () {
    for (const card of this._openCards) {
      this.concealCard(card)
    }
    this._openCards.length = 0
  }

  /**
   * Shuffles the this._cards array
   */
  shuffleCard () {
    for (let currentIndex = this._cards.length - 1; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
      const temp = this._cards[currentIndex]
      this._cards[currentIndex] = this._cards[randomIndex]
      this._cards[randomIndex] = temp
    }
  }

  createCardElement (id) {
    console.log(1)
    const imagePath = `${imageFolder}/0.png`

    const card = document.createElement('img')
    card.id = id
    card.classList.add('card')
    card.setAttribute('src', imagePath)
    this.setEnable(card, true)

    return card
  }

  revealCard (card) {
    const image = `${imageFolder}/${card.id}.png`
    card.setAttribute('src', image)
  }

  concealCard (card) {
    const image = `${imageFolder}/0.png`
    card.setAttribute('src', image)
  }

  discardCard (card) {
    const image = `${imageFolder}/empty.png`
    card.setAttribute('src', image)
    this.setEnable(card, false)
  }

  /**
   * Decides if the card can be interacted with or not
   *
   * @param {*} card for car
   * @param {boolean} enabled for status
   */
  setEnable (card, enabled) {
    card.setAttribute('data-enabled', enabled)
  }
}

window.customElements.define(appName, MemoryGame)

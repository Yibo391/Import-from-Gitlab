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
    this._blockKeyNavigation = false
  }

  connectedCallback () {
    this.addEventListener('windowgotfocus', () => {
      this._enableKeyNavigation()
    })
    this.addEventListener('windowlostfocus', () => {
      this._disableKeyNavigation()
    })
    this._chooseSize()
  }

  _resetGame () {
    this._clearContent()
    this._chooseSize()
  }

  _chooseSize () {
    this._blockKeyNavigation = false
    this.shadowRoot.appendChild(chooseSizeTemplate.content.cloneNode(true))
    const form = this.shadowRoot.querySelector('#sizeForm')
    form.addEventListener('submit', e => {
      e.preventDefault()
      const size = parseInt(form.querySelector('#nrOfCards').value)
      this._startGame(size)
    })
  }

  _startGame (size) {
    this._blockKeyNavigation = true
    this._clearContent()

    this._cards = [] // all cards
    this._openCards = [] // shown cards
    this._blockAction = false // used to (temporarily) block card interactions
    this._nrOfMoves = 0
    this._selectIndex = 0 // array index of selected card (keyboard navigation)
    this._clockInterval = undefined // clock interval
    this._movesCounter = undefined // where the nr of moves are shown

    let rows
    this._cols = size > 6
      ? 4
      : size === 6
        ? 3
        : 2
    rows = size < 12
      ? 2
      : size === 16
        ? 4
        : 3

    this._totalCards = size
    this._cardsLeft = this._totalCards

    for (let i = 1; i <= this._totalCards / 2; i++) {
      for (let j = 0; j < 2; j++) {
        const card = this._createCard(i)
        this._cards.push(card)
      }
    }

    // shuffles cards and insert into game element with correct rows and columns
    this._shuffleCards()

    const table = document.createElement('table')
    table.className = 'cards'
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    this.shadowRoot.appendChild(table)

    let id = 0
    for (let row = 0; row < rows; row++) {
      const tRow = tr.cloneNode()
      table.appendChild(tRow)
      for (let col = 0; col < this._cols; col++) {
        const tCell = td.cloneNode()
        tCell.setAttribute('id', 'card' + id++)
        tRow.appendChild(tCell)
        tCell.appendChild(this._cards.pop())
      }
    }
    table.addEventListener('mousedown', e => e.preventDefault()) // prevents drag behaviour of img
    table.addEventListener('click', e => this._interactWithCard(e.target))
    this._selectCard(0)

    // Clock and stats
    const gameStats = gameStatsSnippet.cloneNode(true)
    this._movesCounter = gameStats.querySelector('#moves')
    this._startTime = new Date().getTime()
    this._clockInterval = setInterval(() => {
      this._timeTaken = ((new Date().getTime() - this._startTime) / 1000).toFixed(1)
      gameStats.querySelector('#clock').innerHTML = this._timeTaken
    }, 100)
    this.shadowRoot.appendChild(gameStats)
  }

  /**
   * Allows navigation with arrow keys and space bar
   */
  _enableKeyNavigation () {
    const rowNavigationKeys = ['ArrowUp', '', 'ArrowDown']
    const colNavigationKeys = ['ArrowLeft', '', 'ArrowRight']
    document.addEventListener('keydown', this._listener = e => {
      if (!this._blockKeyNavigation) {
        return
      }

      if (rowNavigationKeys.includes(e.key)) {
        const indexChange = (rowNavigationKeys.indexOf(e.key) - 1) * this._cols
        this._selectCard(indexChange)
      } else if (colNavigationKeys.includes(e.key)) {
        const indexChange = colNavigationKeys.indexOf(e.key) - 1
        this._selectCard(indexChange)
      } else if (e.key === ' ') {
        e.preventDefault()
        const card = this._getSelectedCard().firstChild
        this._interactWithCard(card)
      }
    })
  }

  _disableKeyNavigation () {
    document.removeEventListener('keydown', this._listener)
  }

  /**
   * Used during key navigation
   * @param {number} indexChange how many array steps to take from the the previously selected card
   */
  _selectCard (indexChange) {
    if (this._selectIndex + indexChange < 0 || this._selectIndex + indexChange > this._totalCards - 1) {
      return
    }

    const oldCard = this._getSelectedCard()
    oldCard.classList.remove('selectedCard')
    this._selectIndex += indexChange

    const newCard = this._getSelectedCard()
    newCard.classList.add('selectedCard')
  }

  /**
   * gets the HTMLElement of this._selectindex
   */
  _getSelectedCard () {
    return this.shadowRoot.querySelector('#card' + this._selectIndex)
  }

  /**
   * Shows card if allowed
   * @param {HTMLElement} card
   */
  _interactWithCard (card) {
    if (this._blockAction || !card.classList.contains('card') || card.getAttribute('data-enabled') === 'false' || this._isGameOver()) {
      return
    }

    if (!this._openCards.includes(card) && this._openCards.length < 2) {
      this._openCards.push(card)
      this._nrOfMoves++
      this._movesCounter.innerText = this._nrOfMoves
      this._showCard(card)
      if (this._openCards.length === 2) {
        if (this._openCards[0].id === this._openCards[1].id) {
          // shown cards match
          this._blockAction = true
          this._cardsLeft -= 2
          if (this._isGameOver()) {
            clearInterval(this._clockInterval) // stops the clock
          }
          setTimeout(() => {
            this._removeMatchedCards()
            this._openCards = []
            this._blockAction = false
          }, showCardsTimeout)
        } else {
          // shown cards do not match
          this._blockAction = true
          setTimeout(() => {
            this._hideOpenCards()
            this._blockAction = false
          }, showCardsTimeout)
        }
      }
    }
  }

  /**
   * Ends the game and presents game over screen if all cards have been matched
   */
  _checkIfGameIsOver () {
    if (this._isGameOver()) {
      this._blockKeyNavigation = true
      this._clearContent()

      const slowTime = Math.pow(this._totalCards, 1.5)
      const tooManyMovesLimit = this._totalCards * 2
      let totalTime

      if (this._timeTaken > 60) {
        const minutes = (this._timeTaken / slowTime).toFixed(0) + ':' + (this._timeTaken % slowTime < 10 ? 0 : '') + (this._timeTaken % slowTime).toFixed(0)
        totalTime = minutes + ' minutes'
      } else {
        totalTime = this._timeTaken + ' seconds'
      }

      const resultPresentation = document.createElement('div')
      resultPresentation.innerText =
        `${this._timeTaken < slowTime ? 'Good job, you' : 'You weren\'t exactly quick, but you'} finished the game in ${totalTime} using ${this._nrOfMoves} moves${this._nrOfMoves < tooManyMovesLimit ? '!' : '. Getting senile?'}`

      this.shadowRoot.appendChild(resultPresentation.cloneNode(true))
      this._chooseSize()
      this.shadowRoot.querySelector('button').innerText = 'Start new game'
    }
  }

  _clearContent () {
    while (this.shadowRoot.firstElementChild !== this.shadowRoot.lastElementChild) {
      this.shadowRoot.lastChild.remove()
    }
  }

  _isGameOver () {
    return this._cardsLeft === 0
  }

  /**
   * Removes shown cards
   */
  _removeMatchedCards () {
    for (let card of this._openCards) {
      this._removeCard(card)
    }
    this._checkIfGameIsOver()
  }

  _hideOpenCards () {
    for (let card of this._openCards) {
      this._hideCard(card)
    }
    this._openCards.length = 0
  }

  /**
   * Shuffles the this._cards array
   */
  _shuffleCards () {
    for (let currentIndex = this._cards.length - 1; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
      const temp = this._cards[currentIndex]
      this._cards[currentIndex] = this._cards[randomIndex]
      this._cards[randomIndex] = temp
    }
  }

  _createCard (id) {
    const imagePath = imageFolder + '/' + 0 + '.png'

    const card = document.createElement('img')
    card.id = id
    card.className = 'card'
    card.setAttribute('src', imagePath)
    this._setCardEnabled(card, true)

    return card
  }

  _showCard (card) {
    const image = imageFolder + '/' + card.id + '.png'
    card.setAttribute('src', image)
  }

  _hideCard (card) {
    const image = imageFolder + '/0.png'
    card.setAttribute('src', image)
  }

  _removeCard (card) {
    const image = imageFolder + '/empty.png'
    card.setAttribute('src', image)
    this._setCardEnabled(card, false)
  }

  /**
   * Decides if the card can be interacted with or not
   * @param {*} card
   * @param {boolean} enabled
   */
  _setCardEnabled (card, enabled) {
    card.setAttribute('data-enabled', enabled)
  }
}

window.customElements.define(appName, MemoryGame)

import { template } from '../template/CalculatorTemplate.js'

class Calculator extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.resultBox = this.shadowRoot.querySelector("input[type='text']")
    this.buttons = this.shadowRoot.querySelectorAll("input[type='button']")
    this.currentValue = ''
    this.previousValue = ''
    this.operator = ''
    this.displayResult = (value) => {
      if (isNaN(value)) {
        this.resultBox.value = 'Error'
      } else {
        this.resultBox.value = value
      }
    }
    this.clearAll = () => {
      this.currentValue = ''
      this.previousValue = ''
      this.operator = ''
      this.displayResult(0)
    }
    this.clearCurrent = () => {
      this.currentValue = ''
      this.displayResult(0)
    }
    this.updateValue = (value) => {
      if (isNaN(value)) {
        this.handleOperator(value)
      } else {
        this.currentValue += value
        this.displayResult(this.currentValue)
      }
    }
    this.handleOperator = (operator) => {
      if (operator === 'C') {
        this.clearAll()
      } else if (operator === 'Clr') {
        this.clearCurrent()
      } else if (operator === '=') {
        this.calculateResult()
      } else {
        this.operator = operator
        this.previousValue = this.currentValue
        this.currentValue = ''
      }
    }
    this.calculateResult = () => {
      let result
      switch (this.operator) {
        case '+':
          result = Number(this.previousValue) + Number(this.currentValue)
          break
        case '-':
          result = this.previousValue - this.currentValue
          break
        case '*':
          result = this.previousValue * this.currentValue
          break
        case '/':
          result = this.previousValue / this.currentValue
          break
        case '%':
          result = this.previousValue % this.currentValue
          break
        default:
          result = 'Error'
      }
      this.displayResult(result)
      this.currentValue = result.toString()
      this.previousValue = ''
      this.operator = ''
    }
    this.buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.updateValue(e.target.value)
      })
    })
  }
}
window.customElements.define('calculator-app', Calculator)

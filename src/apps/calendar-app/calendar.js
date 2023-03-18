import * as Template from './calendar-templates.js'

const AppName = 'calendar-app'
const AppPath = '/apps/' + AppName

const StyleTemplate = document.createElement('template')
StyleTemplate.innerHTML = `
  <link rel='stylesheet' href='${AppPath}/css/calendar-style.css'>
`

const Views = {
  MonthView: 'monthView',
  YearView: 'yearView'
}

/**
 * Simple calendar app with year view and month view
 * Click a month to switch to month view, the year to switch to year view, and use the arrows to scroll
 */
class CalendarApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this._currentYear = new Date().getUTCFullYear()
    this._currentMonth = new Date().getUTCMonth()
  }

  connectedCallback () {
    this.shadowRoot.appendChild(StyleTemplate.content.cloneNode(true))
    this._renderYearView()
  }

  _renderYearView () {
    this._clearContent()

    // navigation
    const yearHeader = Template.navigation.cloneNode(true)
    yearHeader.id = 'yearNav'
    yearHeader.querySelector('#month').remove()
    yearHeader.querySelector('#yearTitle').innerText = this._currentYear
    this.shadowRoot.appendChild(yearHeader)
    this._setNavigationEventListeners(yearHeader, Views.YearView)

    // flex container
    const flexContainer = document.createElement('div')
    flexContainer.className = 'flexContainer'
    this.shadowRoot.appendChild(flexContainer)

    // month cards
    for (let month = 0; month < 12; month++) {
      this.shadowRoot.appendChild(Template.monthLink.content.cloneNode(true))
      const monthLink = this.shadowRoot.lastElementChild

      monthLink.addEventListener('click', () => {
        this._currentMonth = month
        this._renderMonthView(this._currentYear, month)
      })
      const monthName = monthLink.querySelector('#monthName')
      monthName.innerText = Template.monthsArr[month]
      monthLink.appendChild(this._makeMonth(this._currentYear, month, false))
      flexContainer.appendChild(monthLink)
    }

    // today link
    this.shadowRoot.appendChild(this._makeTodayLink(Views.YearView))
  }

  _renderMonthView (year = this._currentYear, month = this._currentMonth) {
    this._clearContent()

    // print headers
    const header = Template.navigation.cloneNode(true)
    this.shadowRoot.appendChild(header)

    header.querySelector('#yearTitle').innerText = year
    header.querySelector('#monthTitle').innerText = Template.monthsArr[month]
    this._setNavigationEventListeners(header, Views.MonthView)

    // month and today link
    this.shadowRoot.appendChild(this._makeMonth(year, month))
    this.shadowRoot.appendChild(this._makeTodayLink(Views.MonthView))
  }

  /**
   * Creates and returns a table of the month specified in the arguments
   * @param {number} year
   * @param {number} month
   * @param {boolean} fullView shows weekdays
   */
  _makeMonth (year = this._currentYear, month = this._currentMonth, fullView = true) {
    // calculations
    const daysLastMonth = new Date(year, month, 0).getDate()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstWeekDayInMonth = new Date(year, month, 1).getUTCDay()
    const weeksInMonth = (firstWeekDayInMonth + daysInMonth) / 7

    const table = document.createElement('table')
    table.id = fullView ? 'fullView' : 'miniView'

    if (fullView) {
      // prints week days headers
      let weekdaysRow = document.createElement('tr')
      table.appendChild(weekdaysRow)
      for (let weekday = 0; weekday < 7; weekday++) {
        const cell = document.createElement('td')
        cell.innerText = Template.weekdaysArr[weekday]
        weekdaysRow.appendChild(cell)
      }
    }

    let day = firstWeekDayInMonth > 0 ? daysLastMonth - firstWeekDayInMonth + 1 : 1
    let isCurrentMonth = day === 1

    // adds a row for each week in the month
    for (let week = 0; week < weeksInMonth; week++) {
      let weekRow = document.createElement('tr')
      weekRow.className = 'weekRow'
      table.appendChild(weekRow)

      // adds a cell for each day
      for (let weekday = 0; weekday < 7; weekday++) {
        const cell = document.createElement('td')
        if ((!isCurrentMonth && day > daysLastMonth) || (isCurrentMonth && day > daysInMonth)) {
          // month shift
          day = 1
          isCurrentMonth = !isCurrentMonth
        }
        if (isCurrentMonth) {
          // marks current day
          const date = new Date(year, month, day)
          if (isToday(date)) {
            cell.className = 'today'
          }
        } else {
          cell.className = 'notCurrentMonth'
        }
        cell.innerText = day
        weekRow.appendChild(cell)
        day++
      }
    }
    return table
  }

  /**
   * Deletes everything in the shadowRoot but the stylesheet
   */
  _clearContent () {
    while (this.shadowRoot.children.length > 1) {
      this.shadowRoot.lastChild.remove()
    }
  }

  /**
   * Returns a (centered) link to get you to present day
   * @param {views} view - which view the anchor links to
   */
  _makeTodayLink (view) {
    const linkTemplate = Template.todayLink.content.cloneNode(true)
    linkTemplate.querySelector('a').addEventListener('click', () => {
      this._currentYear = new Date().getUTCFullYear()
      this._currentMonth = new Date().getUTCMonth()
      this._clearContent()
      if (view === Views.MonthView) {
        this._renderMonthView()
      } else if (view === Views.YearView) {
        this._renderYearView()
      }
    })
    return linkTemplate
  }

  /**
   * Sets listeners for navigation buttons
   * @param {HTMLElement} parent
   * @param {views} view which view to use (month or year)
   */
  _setNavigationEventListeners (parent, view) {
    parent.addEventListener('click', e => {
      if (e.target.nodeName === 'A') {
        if (e.target.id === 'prevYear') {
          this._currentYear--
        } else if (e.target.id === 'nextYear') {
          this._currentYear++
        } else if (e.target.id === 'prevMonth') {
          this._currentMonth--
        } else if (e.target.id === 'nextMonth') {
          this._currentMonth++
        } else if (e.target.id === 'yearTitle') {
          this._renderYearView()
          return
        }

        if (this._currentMonth === -1) {
          this._currentMonth = 11
          this._currentYear--
        } else if (this._currentMonth === 12) {
          this._currentMonth = 0
          this._currentYear++
        }
        if (view === Views.MonthView) {
          this._renderMonthView()
        } else if (view === Views.YearView) {
          this._renderYearView()
        }
      }
    })
  }
}

function isToday (date) {
  const dateToday = new Date()
  return dateToday.getUTCFullYear() === date.getUTCFullYear() &&
  dateToday.getUTCMonth() === date.getUTCMonth() &&
  dateToday.getDate() === date.getDate()
}

window.customElements.define(AppName, CalendarApp)

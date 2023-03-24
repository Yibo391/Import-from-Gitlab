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
    this.naviListener(yearHeader, Views.YearView)

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
    this.naviListener(header, Views.MonthView)

    // month and today link
    this.shadowRoot.appendChild(this._makeMonth(year, month))
    this.shadowRoot.appendChild(this._makeTodayLink(Views.MonthView))
  }

  /**
   * Creates and returns a table of the month specified in the arguments
   *
   * @param {number} year year
   * @param {number} month month
   * @param {boolean} fullView shows weekdays
   * @returns {boolean} - Returns `true` if the date is today's date, otherwise `false`.
   */
  _makeMonth (year = this._currentYear, month = this._currentMonth, fullView = true) {
    const table = document.createElement('table')
    table.id = fullView ? 'fullView' : 'miniView'

    if (fullView) {
      const weekdaysRow = document.createElement('tr')
      table.appendChild(weekdaysRow)
      Template.weekdaysArr.forEach(day => {
        const cell = document.createElement('td')
        cell.innerText = day
        weekdaysRow.appendChild(cell)
      })
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate()

    let day = 1
    for (let week = 0; day <= daysInMonth; week++) {
      const weekRow = document.createElement('tr')
      weekRow.className = 'weekRow'
      table.appendChild(weekRow)

      for (let weekday = 0; weekday < 7 && day <= daysInMonth; weekday++) {
        const cell = document.createElement('td')
        const date = new Date(year, month, day)
        if (date.toDateString() === new Date().toDateString()) {
          cell.className = 'today'
        } else if (date.getMonth() !== month) {
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
    this.shadowRoot.innerHTML = '<link rel="stylesheet" href="' + AppPath + '/css/calendar-style.css">'
  }

  /**
   * Returns a (centered) link to get you to present day
   *
   * @param {views} view - which view the anchor links to
   * @returns {boolean} - Returns `true` if the date is today's date, otherwise `false`.
   */
_makeTodayLink (view) {
  const link = document.createElement('a')
  link.href = '#'
  link.innerText = 'Today'

  link.addEventListener('click', () => {
    const today = new Date()
    this._currentYear = today.getUTCFullYear()
    this._currentMonth = today.getUTCMonth()
    this._clearContent()
    this._renderYearView() // always render the year view after clicking "Today" link
  })

  const linkWrapper = document.createElement('div')
  linkWrapper.classList.add('todayLink')
  linkWrapper.appendChild(link)

  return linkWrapper
}


  /**
   * Sets listeners for navigation buttons
   *
   * @param {HTMLElement} parent
   * @param {views} view which view to use (month or year)
   */
  naviListener (parent, view) {
    const navigationEvents = {
      prevYear: () => this._currentYear--,
      nextYear: () => this._currentYear++,
      prevMonth: () => this._currentMonth--,
      nextMonth: () => this._currentMonth++,
      yearTitle: () => this._renderYearView()
    }

    parent.addEventListener('click', e => {
      if (e.target.nodeName === 'A' && navigationEvents[e.target.id]) {
        navigationEvents[e.target.id]()

        if (this._currentMonth < 0) {
          this._currentMonth = 11
          this._currentYear--
        } else if (this._currentMonth > 11) {
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

/**
 * Determines if a given date is today's date.
 *
 * @param {Date} date - The date to check.
 * @returns {boolean} - Returns `true` if the date is today's date, otherwise `false`.
 */
function isToday (date) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return date.getTime() === today.getTime()
}

window.customElements.define(AppName, CalendarApp)

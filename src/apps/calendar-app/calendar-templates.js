/**
 * Used to navigate and display year and month as a top bar
 */
export const navigation = document.createElement('div')
navigation.id = 'monthNav'
navigation.innerHTML = `
  <div id='year'>
    <a id='prevYear' href='#'>&#8678;</a>
    <a id='yearTitle' class='middle' href='#'>Year</a>
    <a id='nextYear' href='#'>&#8680;</a>
  </div>
  <div id='month'>
    <a id='prevMonth' href='#'>&#8678;</a>
    <span id='monthTitle'>
      Month
    </span>
    <a id='nextMonth' href='#'>&#8680;</a>
  </div>
  
`

/**
 * A today-link used to get you to present date
 */
export const todayLink = document.createElement('template')
todayLink.innerHTML = `
  <div id='todayLink'>
    <a href='#' id='todayLink'>today</a>
  </div>
`

/**
 * Link for each month used in the year view
 */
export const monthLink = document.createElement('template')
monthLink.innerHTML = `
    <a href='#' class='miniMonth'>
      <div id='monthName'></div>
    </a>
`

/**
 * Months in text
 */
export const monthsArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/**
 * Weekdays in text
 */
export const weekdaysArr = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

/**
 * Pick username form template
 */
export const pickUsernameTemplate = document.createElement('template')
pickUsernameTemplate.innerHTML = `
  <form id='usernameForm'>
    <input id='username' type='text' autofocus autocomplete='off' placeholder='Type a username...'>
    <button type='submit'>Use</button> 
  </form>
`

/**
 * Main chat app layout
 */
export const appLayout = document.createElement('div')
appLayout.id = 'layout'
appLayout.className = 'disabled'
appLayout.innerHTML = `
  <div id='channels'>
    <h3>Channels</h3>
    <a href='#' class='selectedChannel' id='all'>All</a>
    <a href='#' id='general' title='General'># General</a>
    <a href='#' id='javascript' title='Javascript chat'># Javascript chat</a>
    <a href='#' id='other' title='Other'># Other</a>

    <div id='customChannels'>
    </div>
    <button id='newChannel'>+</button>
  </div>  

  <div id='chatMessageBox'>
  </div>
  
  <div id='userInputs'>
    <div id='notification'>Connecting to server...</div>
    
    <form id='chatForm'>
      <textarea id='chatInput'></textarea>
      <button type='submit' disabled>Send</button>
    </form>
  </div>
`

export const channelLinkTemplate = document.createElement('template')
channelLinkTemplate.innerHTML = `
  <a href='#' id=''>
    <span class='delete' id=''>x</span>
  </a>
`

export const newChannelTemplate = document.createElement('template')
newChannelTemplate.innerHTML = `
  <input id='channelName' type='text' autocomplete='off' placeholder='Channel name...'>
`

/**
 * Message line snippet
 */
export const messageSnippet = document.createElement('div')
messageSnippet.className = 'msg'

/**
 * Empty message line snippet. Intended to be used to indicate a possible time gap where the browser did not collect any message data
 */
export const emptyLineSnippet = document.createElement('p')
emptyLineSnippet.className = 'emptyLine'

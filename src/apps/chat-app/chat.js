import * as Template from './chat-templates.js'
import ServerConnection from './server-communication.js'

const WebstorageUsernameKey = 'ee222yb.chatApp.username'
const WebstorageChatHistoryKey = 'ee222yb.chatApp.chatHistory'
const WebstorageCustomChatChannels = 'ee222yb.chatApp.customChatChannels'

const SaveData = true
const UniversalChannel = 'all'
const ReconnectInterval = 5000 // how often the app checks for server connection after the connection has been lost

const AppName = 'chat-app'
const AppPath = 'apps/' + AppName

const StyleTemplate = document.createElement('template')
StyleTemplate.innerHTML = `
  <link rel='stylesheet' href='${AppPath}/css/chat-style.css'>
`

/**
 * A simple chat application
 * Hold shift to input line break when writing messages
 * Red lines indicates a possible time gap when data was not collected
 */
class ChatApp extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this._activeReconnectInterval = undefined
    this.shadowRoot.appendChild(StyleTemplate.content.cloneNode(true))
  }

  connectedCallback () {
    const chatHistory = JSON.parse(window.localStorage.getItem(WebstorageChatHistoryKey))
    if (chatHistory) {
      chatHistory.push({ empty: true })
    }
    this._chatPosts = chatHistory || []

    this._customChatChannels = JSON.parse(window.localStorage.getItem(WebstorageCustomChatChannels)) || []

    this._username = window.localStorage.getItem(WebstorageUsernameKey)
    if (this._username) {
      this._renderMainLayout()
    } else {
      this._renderUsernameSelectLayout()
    }

    setTimeout(() => { // makeshift solution. for some reason the scroll to bottom doesn't work when loaded for the first time (works fine when changing channels)
      this._scrollToLastLine()
    }, 1000)
  }

  /**
   * Renders the user name select layout
   */
  _renderUsernameSelectLayout () {
    this.shadowRoot.appendChild(Template.pickUsernameTemplate.content.cloneNode(true))
    const usernameForm = this.shadowRoot.querySelector('#usernameForm')
    usernameForm.addEventListener('submit', e => {
      e.preventDefault()
      this._username = usernameForm.querySelector('#username').value
      window.localStorage.setItem(WebstorageUsernameKey, this._username)
      this.shadowRoot.removeChild(usernameForm)
      this._renderMainLayout()
      usernameForm.remove()
    })
  }

  /**
   * Renders the main application layout: channels, message, user inputs
   */
  _renderMainLayout () {
    this.shadowRoot.appendChild(Template.appLayout.cloneNode(true))

    this._chatForm = this.shadowRoot.querySelector('#chatForm')
    this._chatForm.addEventListener('submit', e => this._submitMessage(e))

    this._chatMessageBox = this.shadowRoot.querySelector('#chatMessageBox')
    this._notification = this.shadowRoot.querySelector('#notification')
    this._chatInput = this.shadowRoot.querySelector('#userInputs').querySelector('textarea')
    // changes default behaviour of text area the send message on enter, unless shift is held
    this._chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        this._submitMessage(e)
      }
    })

    const channels = this.shadowRoot.querySelector('#channels')
    this._reservedChannels = []
    for (const channel of channels.querySelectorAll('a')) {
      this._reservedChannels.push(channel.id)
    }

    const customChannels = channels.querySelector('#customChannels')
    this._renderChannels()
    this._connectToServer()
    this._setChannel(UniversalChannel)

    channels.addEventListener('click', e => {
      if (e.target.nodeName === 'A') {
        this._setChannel(e.target.id)
      } else if (e.target.nodeName === 'BUTTON') {
        this._createNewChannel(e.target)
      }
    })

    const deleteHandler = e => {
      if (e.key === 'Delete' || e.target.className === 'delete') {
        this._deleteChannel(e.target.id)
        this._renderChannels()
      }
    }

    customChannels.addEventListener('keydown', e => deleteHandler(e))
    customChannels.addEventListener('click', e => deleteHandler(e))

    this.addEventListener('windowClosed', () => {
      this._serverConnection.disconnect()
    })
  }

  _renderChannels () {
    const customChannels = this.shadowRoot.querySelector('#customChannels')
    while (customChannels.lastChild) {
      customChannels.lastChild.remove()
    }

    for (let customChannel of this._customChatChannels) {
      customChannels.appendChild(Template.channelLinkTemplate.content.cloneNode(true))
      const newChannel = customChannels.lastElementChild
      newChannel.id = customChannel
      newChannel.appendChild(document.createTextNode('# ' + customChannel))
      newChannel.lastElementChild.id = customChannel
    }
    if (this._currentChannel) {
      this._markChannel(this._currentChannel)
    }
  }

  /**
   * Attempts to connect to the server. Attempts to reconnect if disconnected unexpectedly
   */
  _connectToServer () {
    // attempting to connect to server
    this._serverConnection = new ServerConnection(this._username)

    this._serverConnection.socket.addEventListener('open', () => {
      // connection established
      this._connectionChangedState(true)
      if (this._activeReconnectInterval && this._serverConnection.isConnected()) {
        // stopping reconnect attempts
        clearInterval(this._activeReconnectInterval)
      }
    })

    // Attempt to reconnect within an interval
    this._serverConnection.socket.addEventListener('close', this._listener = e => {
      // connection lost
      this._connectionChangedState(false)

      // makes not sure not to start reconnecting if the disconnect was expected, and to not set multiple reconnect intervals
      if (this._serverConnection.wasExpectedDisconnect(e) || this._activeReconnectInterval) {
        return
      }

      // attempting to reconnect
      this._activeReconnectInterval = setInterval(() => {
        if (this._serverConnection.isDisconnected()) {
          this._connectToServer()
        }
      }, ReconnectInterval)
    })

    this._serverConnection.socket.addEventListener('message', e => this._receiveMessage(e))
  }

  /**
   * If event contains message data, stores it in localstorage and renders it on screen (if you're in the appropriate channel)
   * @param {Event} event
   */
  _receiveMessage (event) {
    const response = JSON.parse(event.data)
    if (response.type === 'message') {
      if (SaveData) {
        response.date = new Date()
        this._chatPosts.push(response)
        window.localStorage.setItem(WebstorageChatHistoryKey, JSON.stringify(this._chatPosts))
      }

      if (response.channel === this._currentChannel || this._currentChannel === UniversalChannel) {
        const msg = this._createMessageLine(response)
        this._chatMessageBox.appendChild(msg)
        this._scrollToLastLine(msg)
      }
    }
  }

  /**
   * Sends what is written in the textarea to the server as a message
   * @param {Event} event
   */
  _submitMessage (event) {
    event.preventDefault()
    this._serverConnection.sendMessage(this._chatInput.value, this._currentChannel)

    this._chatInput.value = ''
    this._chatInput.focus()
  }

  /**
   * Sets current channel in the application.
   * Loads messages from chat history that belongs to the channel
   * @param {string} channelId
   */
  _setChannel (channelId) {
    if (channelId === this._currentChannel) {
      return
    }
    this._markChannel(channelId)
    this._currentChannel = channelId

    const filteredChatPosts = channelId === UniversalChannel
      ? this._chatPosts
      : this._chatPosts.filter(chatPost => chatPost.channel === channelId || chatPost.empty)

    while (this._chatMessageBox.lastChild) {
      this._chatMessageBox.lastChild.remove()
    }
    let line
    for (const chatPost of filteredChatPosts) {
      if (chatPost.data || (line && line.className !== 'emptyLine')) { // should stop from printing two empty lines
        line = this._createMessageLine(chatPost)
        this._chatMessageBox.appendChild(line)
      }
    }

    // scroll to last line once everything's rendered
    setTimeout(() => {
      this._scrollToLastLine()
    })
  }

  _createNewChannel () {
    const channels = this.shadowRoot.querySelector('#channels')
    const button = channels.querySelector('button')
    button.remove()
    channels.appendChild(Template.newChannelTemplate.content.cloneNode(true))
    const input = channels.querySelector('input[type=text]')
    input.focus()

    const restore = e => {
      if (e.key === 'Enter') {
        const newName = input.value.trim()
        // check that length is > 0, channel does not already exist
        if (newName.length > 0 && !this._reservedChannels.find(channel => channel.toLowerCase() === newName.toLowerCase()) && !this._customChatChannels.find(channel => channel.toLowerCase() === newName.toLowerCase())) {
          this._customChatChannels.push(newName)
          window.localStorage.setItem(WebstorageCustomChatChannels, JSON.stringify(this._customChatChannels))
          this._renderChannels()
        }
      } else if (e.target.nodeName === 'INPUT' || (e.key && e.key !== 'Escape')) {
        return
      }

      channels.removeEventListener('click', restore)
      document.removeEventListener('keydown', restore)
      input.remove()
      channels.appendChild(button)
    }
    channels.addEventListener('click', restore)
    document.addEventListener('keydown', restore)
  }

  _deleteChannel (channelId) {
    if (this._currentChannel === channelId) {
      this._setChannel(UniversalChannel)
    }
    this._customChatChannels = this._customChatChannels.filter(channel => channel !== channelId)
    window.localStorage.setItem(WebstorageCustomChatChannels, JSON.stringify(this._customChatChannels))
  }

  /**
   * Marks the channel name to indicate it's selected. Unmarks the previous channel
   */
  _markChannel (channelId) {
    const channels = this.shadowRoot.querySelector('#channels')
    const prevChannel = channels.querySelector('#' + this._currentChannel)
    if (prevChannel) {
      prevChannel.className = ''
    }
    const newChannel = channels.querySelector('#' + channelId)
    newChannel.className = 'selectedChannel'
  }

  /**
   * Changes the appearance of the chat window depending on your connection status
   * When disconnected, disables chat input with a notification, and makes window grey to indicate offline status
   */
  _connectionChangedState (isConnected) {
    this._chatForm.querySelector('button[type="submit"]').disabled = !isConnected
    if (isConnected) {
      this.shadowRoot.querySelector('#layout').classList.remove('disabled')
      this._chatInput.focus()
      this._notification.style.display = 'none'
      this._chatForm.style.display = 'block'
    } else {
      this.shadowRoot.querySelector('#layout').classList.add('disabled')
      this._notification.style.display = 'block'
      this._chatForm.style.display = 'none'
      this._notification.innerHTML = 'No connection to server<br>you are now viewing cached messages...'
    }
  }

  /**
   * Creates a chat message line with timestamp, username, and the message
   * Creates an empty red line if the message contains no data
   * @param {*} message should contain date, data (message), and username
   */
  _createMessageLine (message) {
    let msgLine
    if (!message.data) {
      msgLine = Template.emptyLineSnippet.cloneNode()
    } else {
      msgLine = Template.messageSnippet.cloneNode()

      if (message.date) {
        const formattedTime = new Date(message.date).toLocaleTimeString().substr(0, 5)

        const time = document.createElement('span')
        time.title = new Date().toLocaleDateString()
        time.className = 'time'
        time.innerText = formattedTime + ' '
        msgLine.appendChild(time)
      }

      const sender = document.createElement('span')
      sender.className = 'sender'
      if (this._currentChannel === UniversalChannel) {
        sender.title = message.channel ? '[' + message.channel + '] ' : 'no channel'
      }
      sender.innerText = message.username + ': '

      msgLine.appendChild(sender)
      msgLine.appendChild(document.createTextNode(message.data))
    }
    return msgLine
  }

  /**
   * Scrolls window to bottom
   */
  _scrollToLastLine () {
    this._chatMessageBox.scrollTop = this._chatMessageBox.scrollHeight
  }

  // not used
  _scrollToMsg (msg) {
    msg.scrollIntoView({ block: 'nearest', inline: 'start' })
  }
}

window.customElements.define(AppName, ChatApp)

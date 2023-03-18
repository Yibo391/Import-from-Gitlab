import { template } from '../template/ChatTemplate.js'

class ChatApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.doesUsernameExist = true
    this.doesChannelExist = true
    this.messageContentJSON = {
      type: 'message',
      data: 'The message text is sent using the data property',
      username: '',
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.websocketAddress = new window.WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.updateUserName = this.shadowRoot.querySelector('#usernameField')
    this.chatBox = this.shadowRoot.querySelector('#chatContainer')
    this.messages = this.shadowRoot.querySelector('#messageArea')
    this.messageInput = this.shadowRoot.querySelector('#messageInput')
    this.sendButton = this.shadowRoot.querySelector('#sendButton')
  }

  /**
   * A function used to retrieve the current time once it is called.
   *
   * @returns {string} The current time is returned.
   */
  getCurrentTime () {
    const date = new Date()
    return (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
  }

  /**
   * A function used to hide fields and show appropriate ones related to username configuration.
   */
  usernameConfiguration () {
    this.updateUserName.disabled = true
    this.messageInput.value = ''
    this.doesUsernameExist = false
    this.sendButton.textContent = 'Confirm changes'
    const notifyInfo = document.createElement('p')
    notifyInfo.textContent = 'First time starting chat, enter a name!'
    this.shadowRoot.querySelector('#input').prepend(notifyInfo)
  }

  /**
   * A function used to retrieve the current time once it is called.
   *
   * @param {Event} event The event that is to be processed incase of retrieval of message.
   */
  receiveUserMessage (event) {
    const dataReceived = JSON.parse(event.data)
    if (dataReceived.type === 'message' || dataReceived.type === 'notification') {
      if (dataReceived.channel !== this.messageContentJSON.channel) {
        return
      }
      if (this.messages.childNodes.length === 40) {
        this.messages.removeChild(this.messages.childNodes[1])
      }
      const dataList = document.createElement('li')
      dataList.appendChild(document.createTextNode(`${this.getCurrentTime()} ${dataReceived.username}: ${dataReceived.data}`))
      // This is a quick work-around after a user is added to the chat
      if (dataReceived.username !== window.localStorage.getItem('username')) {
        dataList.classList.add('user-message')
      } else {
        dataList.classList.add('other-message')
      }
      this.messages.appendChild(dataList)
      this.chatBox.scrollTop = this.chatBox.scrollHeight
    }
  }

  /**
   * A function used to send the messages from the user to the channel.
   */
  sendUserMessage () {
    if (this.doesUsernameExist === true && this.doesChannelExist === true) {
      const message = this.messageInput.value
      if (!message.length >= 1) {
        this.messageInput.value = ''
      } else {
        this.messageInput.value = ''
        this.messageContentJSON.data = message
        this.websocketAddress.send(JSON.stringify(this.messageContentJSON))
      }
    } else if (this.doesChannelExist === true && this.doesUsernameExist === false) {
      const username = this.messageInput.value
      if (username.length >= 1) {
        window.localStorage.setItem('username', this.messageInput.value)
        this.messageInput.value = ''
        this.messageContentJSON.username = username
        const usernameInfo = document.createElement('li')
        usernameInfo.appendChild(document.createTextNode('The username now is: ' + '"' + username + '"'))
        this.messages.appendChild(usernameInfo)
        this.disableUsernameConfiguration()
      }
    } else if (this.doesUsernameExist === true && this.doesChannelExist === false) {
      const channel = this.messageInput.value
      if (channel.length >= 1) {
        this.messageInput.value = ''
        this.messageContentJSON.channel = channel
        this.hidechannelConfigurationField()
        const channelInfo = document.createElement('li')
        channelInfo.appendChild(document.createTextNode('The channel now is: ' + '"' + channel + '"'))
        this.messages.appendChild(channelInfo)
        this.chatBox.scrollTop = this.chatBox.scrollHeight
      }
      this.updateUserName.disabled = false
    }
  }

  /**
   * A function used to hide fields and show appropriate ones related to username configuration.
   */
  disableUsernameConfiguration () {
    this.updateUserName.disabled = false
    this.shadowRoot.querySelector('#input').removeChild(this.shadowRoot.querySelector('#input').firstChild)
    this.sendButton.textContent = 'Send message'
    this.doesUsernameExist = true
  }

  /**
   * A function used to disconnect from the chat and close the window respectively.
   */
  disconnectFromChat () {
    this.websocketAddress.close()
  }

  connectedCallback () {
    if (!window.localStorage.getItem('username')) {
      this.usernameConfiguration()
    } else {
      this.messageContentJSON.username = window.localStorage.getItem('username')
    }
    this.sendButton.addEventListener('click', () => {
      this.sendUserMessage()
    })
    this.updateUserName.addEventListener('click', () => {
      this.usernameConfiguration()
    })
    this.messageInput.addEventListener('click', () => {
      this.messageInput.focus()
    })
    this.messageInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.sendUserMessage()
      }
    })
    this.websocketAddress.addEventListener('message', (event) => {
      this.receiveUserMessage(event)
    })
  }
}
window.customElements.define('chat-app', ChatApp)

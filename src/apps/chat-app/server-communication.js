const address = 'ws://vhost3.lnu.se:20080/socket/'
const apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
const normalDisconnectCode = 1000

/**
 * Simple class that handles the connection with the chat server
 * Calling the constructor attempts to open up a new connection
 * The user can add event listeners to 'open' (connection established), 'close' (connection broken), and 'message' (data received) on the socket variable
 */
export default class ServerConnection {
  /**
   * @param {string} userName
   */
  constructor (userName) {
    this._userName = userName
    this.socket = new window.WebSocket(address)
  }

  /**
   * Closes the websocket connection with a normal code
   */
  disconnect () {
    this.socket.close(normalDisconnectCode)
  }

  /**
   * Tells whether this was an expected disconnect or not (user disconnected with the disconnect() method)
   * Use this in the close listener
   * @param {Event} event
   */
  wasExpectedDisconnect (event) {
    return event.code === normalDisconnectCode
  }

  /**
   * Tells whether there is an active connection to the server or not
   */
  isConnected () {
    return this.socket.readyState === window.WebSocket.OPEN
  }

  /**
   * Tells whether there is an active connection to the server or not
   */
  isDisconnected () {
    return this.socket.readyState === window.WebSocket.CLOSED
  }

  /**
   * Sends specified msg to the server using specified channel
   * @param {string} msg
   */
  sendMessage (msg, channel) {
    const parceledMsg = {
      'type': 'message',
      'data': msg,
      'username': this._userName,
      'channel': channel,
      'key': apiKey
    }

    this.socket.send(JSON.stringify(parceledMsg))
  }
}

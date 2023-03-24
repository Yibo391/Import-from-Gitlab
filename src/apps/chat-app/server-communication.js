const address = 'ws://localhost:8080/'
const normalDisconnectCode = 1000
/**
 * Represents a WebSocket connection to a server.
 *
 * @class
 * @param {string} userName - The username of the client connecting to the server.
 */
export default class ServerConnection {
  /**
   * Creates a new instance of ServerConnection class.
   *
   * @class
   * @param {string} userName - The username of the client connecting to the server.
   */
  constructor (userName) {
    this._userName = userName
    this.socket = new window.WebSocket(address)
  }

  /**
   * Closes the WebSocket connection to the server.
   *
   * @function
   */
  disconnect () {
    this.socket.close(normalDisconnectCode)
  }

  /**
   * Checks whether the WebSocket connection was closed as expected or not.
   *
   * @function
   * @param {Event} event - The WebSocket close event.
   * @returns {boolean} - True if the connection was closed as expected, false otherwise.
   */
  wasExpectedDisconnect (event) {
    return event.code === normalDisconnectCode
  }

  /**
   * Checks whether the WebSocket connection to the server is open.
   *
   * @function
   * @returns {boolean} - True if the WebSocket connection is open, false otherwise.
   */
  isConnected () {
    return this.socket.readyState === window.WebSocket.OPEN
  }

  /**
   * Checks whether the WebSocket connection to the server is closed.
   *
   * @function
   * @returns {boolean} - True if the WebSocket connection is closed, false otherwise.
   */
  isDisconnected () {
    return this.socket.readyState === window.WebSocket.CLOSED
  }

  /**
   * Sends a message to the server through the WebSocket connection.
   *
   * @function
   * @param {string} msg - The message to send.
   * @param {string} channel - The channel to send the message to.
   */
  sendMessage (msg, channel) {
    const parceledMsg = {
      type: 'message',
      data: msg,
      username: this._userName,
      channel
    }

    this.socket.send(JSON.stringify(parceledMsg))
  }
}

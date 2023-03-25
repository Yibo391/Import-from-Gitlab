// Import the WebSocket library
const WebSocket = require('ws')

// Create a WebSocket server listening on port 8080
const server = new WebSocket.Server({ port: 8080 })

// A Set to store all connected WebSocket clients
const clients = new Set()

/**
 * Event handler for new connections to the server.
 *
 * @param {WebSocket} socket - The WebSocket instance representing the client connection.
 */
server.on('connection', (socket) => {
  console.log('New client connected')
  clients.add(socket)

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`)
    // Broadcast the message to all connected clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    }
  })

  socket.on('close', () => {
    console.log('Client disconnected')
    clients.delete(socket)
  })
})

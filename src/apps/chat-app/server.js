const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 8080 })

server.on('connection', (socket) => {
  console.log('Client connected')

  // Broadcast received messages to all connected clients
  socket.on('message', (message) => {
    const parsedMessage = JSON.parse(message)
    console.log(`Received message from ${parsedMessage.username}: ${parsedMessage.text}`)

    const broadcastMessage = JSON.stringify({
      type: 'message',
      username: parsedMessage.username,
      text: parsedMessage.text
    })
    console.log(parsedMessage.username)
    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(broadcastMessage)
      }
    })
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

console.log('WebSocket server is running on ws://localhost:3000')

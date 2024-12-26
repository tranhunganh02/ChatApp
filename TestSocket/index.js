const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Setup for WebRTC signaling
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('offer', (offer, callback) => {
    console.log('Received offer:', offer);
    socket.broadcast.emit('offer', offer); // Broadcast offer to other clients
    callback('Offer received');
  });

  socket.on('answer', (answer) => {
    console.log('Received answer:', answer);
    socket.broadcast.emit('answer', answer); // Broadcast answer to the caller
  });

  socket.on('candidate', (candidate) => {
    console.log('Received candidate:', candidate);
    socket.broadcast.emit('candidate', candidate); // Broadcast ICE candidate
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

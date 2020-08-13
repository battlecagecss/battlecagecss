const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const {
  createPlayer
} = require('./socketMessages');

app.use(express.json());
app.use(express.static('dist'));


app.get('/room/:room', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
      app.get('*', (req, res) => {
        res.redirect("/room/default");
      });

io.on('connect', (socket) => {
  let room = null;

  socket.on('joinRoom', (roomName) => {
    roomName = roomName.length ? roomName : 'default';
    room = createPlayer(io, socket, roomName, {});
    socket.on('updatePage', (data) => {
      console.log('emitting new HTML to ', room.room);
      room.updateHtml(data.html);
    });

    socket.on('disconnect', () => (room ? room.removePlayer(socket.id) : null));
  });
});

// io.on('connection', (socket) => {
// 	console.log('a user connected at socket');
// 	socket.emit('welcome');
// });

module.exports = http;
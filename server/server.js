const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { createPlayer } = require('./socketMessages');

app.use(express.json());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/room/:room', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

io.on('connect', (socket) => {
  let room = null;
  // TODO: move the socket logic into a separate file
  socket.on('joinRoom', (roomName) => {
    roomName = roomName.length ? roomName : 'default';
    room = createPlayer(io, socket, roomName, {});
    socket.on('updatePage', (data) => {
      console.log('emitting new HTML to ', room.room);
      socket.to(room.room).emit('newPage', data);
    });
  });

  socket.on('disconnect', () => (room ? room.removePlayer(socket.id) : null));
});

io.on('connection', (socket) => {
  console.log('a user connected at socket');
  socket.emit('welcome');
  fetch('https://developer.mozilla.org/en-US/')
    .then((x) => x.text())
    .then((string) => string.replace(/\/static/g, 'https://developer.mozilla.org/static'))
    .then((data) => {
      // console.log(data);
      return data;
    })
    .then((resp) => socket.emit('pageInfo', resp));
});

module.exports = http;

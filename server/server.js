const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected at socket');
  socket.emit('welcome');
  fetch('https://developer.mozilla.org/en-US/')
    .then((x) => x.text())
    .then((string) => string.replace(/\/static/g, 'https://developer.mozilla.org/static'))
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((resp) => socket.emit('pageInfo', resp));
});

module.exports = http;

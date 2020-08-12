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
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/room/:room', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connect', (socket) => {
	// TODO: move the socket logic into a separate file
	socket.on('joinRoom', (roomName) => {
		roomName = roomName.length ? roomName : 'default';
		socket.join(roomName, () => {
			console.log('room name: ', roomName);
			io.in(roomName).emit('joinedRoom', `${socket.id} joined ${roomName}`);
			createPlayer(io, socket, roomName, {});
		});
	});
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

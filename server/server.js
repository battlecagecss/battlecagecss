const express = require('express');
const fetch = require('node-fetch');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { createPlayer } = require('./socketMessages');

app.use(express.json());
app.use(express.static('assets'));

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

// 	socket.emit('welcome');
module.exports = http;

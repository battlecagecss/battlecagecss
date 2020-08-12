// Socket.IO messages

const rooms = {};

class Player {
	constructor(socket = '', name = '', pictureURL = '') {
		this.socket = socket;
		this.name = name;
		this.wins = 0;
		this.pictureURL = pictureURL;
		this.vote = ''; // should hold socketID of the player this player has voted FOR
	}
	incrementWin() {
		this.wins++;
	}
}

class DOMNode {
	constructor(nodeID = '', attribute = '', value = '') {
		this.nodeID = nodeID;
		this.attribute = attribute;
		this.value = value;
	}
}

class Room {
	constructor(io, room) {
		this.io = io;
		this.room = room;
		this.timer = new Timer(io, room);
		this.node = null;
		this.cssAttr = null;
		this.Player1 = {
			votes: 0,
			changes: new DOMNode(),
			player: new Player()
		};
		this.Player2 = {
			votes: 0,
			changes: new DOMNode(),
			player: new Player()
		};
		this.playerList = [];
	}

	getPlayers(socket) {
		return socket.emit('returnPlayerList', this.playerList);
	}

	addPlayer(socket, player) {
		const newPlayer = new Player(socket, player.name, player.pictureURL);
		this.playerList.push(newPlayer);
		this.updatePlayerlist();
	}

	removePlayer(socketID) {
		this.playerList = this.playerList.filter((player) => player.socket.id !== socketID);
		this.updatePlayerlist();
	}

	updatePlayerlist() {
		this.io.to(this.room).emit('updatePlayerList', this.playerList);
	}

	submitVote(socketID, vote) {
		//find the player who matches the ID
		const votingPlayer = this.playerList.filter((player) => player.socket.id === socketID);
		// change their vote to the socketID they voted FOR
		votingPlayer.vote = vote;
		this.tallyVotes();
	}

	tallyVotes() {
		this.Player1.votes = 0;
		this.Player2.votes = 0;
		// go through everyone in the playerList,
		this.playerList.forEach((player) => {
			// check who they voted for
			if (player.vote === this.Player1.player.socket.id) this.Player1.votes++;
			if (player.vote === this.Player2.player.socket.id) this.Player2.votes++;
		});
		this.updateVotes();
	}

	updateVotes() {
		const Player1 = this.Player1;
		const Player2 = this.Player2;
		this.io.to(this.room).emit('updateVotes', { Player1, Player2 });
	}

	resetVotes() {
		this.playerList = this.playerList.map((player) => {
			player.vote = '';
			return player;
		});
		this.updateVotes();
	}

	submitChange(socket, value) {
		if (socket.id === this.Player1.player.socket.id) this.Player1.changes.value = value;
		if (socket.id === this.Player2.player.socket.id) this.Player2.changes.value = value;
	}

	returnChanges() {
		const Player1 = this.Player1;
		const Player2 = this.Player2;
		this.io.to(this.room).emit('playerCSSChanges', { Player1, Player2 });
	}
}

class Timer {
	constructor(io, room) {
		this.io = io;
		this.room = room;
		this.time = 0;
		this.cb = {};
	}

	updateTimer() {
		this.io.to(this.room).emit('timer', { timeRemaining: this.time });
	}

	setCountdown(time, cb) {
		this.time = time;
		this.cb = cb;
	}

	runCountdown() {
		// if there is no time left, emit a time's up signal
		if (!this.time) return this.timeUp();
		// otherwise, emit an update timer with the time and set a setTimeout
		this.updateTimer();
		this.time -= 1;
		setTimeout(this.runCountdown, 1000);
	}

	timeUp() {
		this.io.to(this.room).emit('timeUp');
	}
}

const createPlayer = (io, socket, room, player) => {
	if (!rooms[room]) rooms[room] = new Room(io, room);
	rooms[room].addPlayer(socket, player);
	console.log('rooms:', rooms);
};

module.exports = { createPlayer, Player, Room, rooms, Timer, DOMNode };

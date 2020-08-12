const { createPlayer, Player, Room, DOMNode, rooms, Timer } = require('../socketMessages');

describe('ROOM Class', () => {
	let roomEmitResponse = null;
	const mockIO = {
		to: (room) => {
			return {
				emit: (eventName, payload) => {
					roomEmitResponse = { eventName, payload, room };
				},
				binary: () => {
					return {
						emit: (eventName, payload) => {
							roomEmitResponse = { eventName, payload, room };
						}
					};
				},
				room
			};
		}
	};

	const mockSocket = {
		id: 'test-id',
		join: () => {},
		emit: (eventName, payload) => {
			eventName, payload;
		}
	};
	const roomName = 'test-room';

	const newRoom = new Room(mockIO, roomName);
	describe('room constructor', () => {
		it('should create a room when constructed', () => {
			expect(newRoom).toBeInstanceOf(Room);
		});
		it('should have a reference to IO when constructed', () => {
			expect(newRoom.io).toBe(mockIO);
		});
		it('should have a reference to the passed in room name when constructed', () => {
			expect(newRoom.room).toBe(roomName);
		});
		it('should create an empty playerlist when created', () => {
			expect(newRoom.playerList.length).toBe(0);
		});
		it('should create an empty timer when created', () => {
			expect(newRoom.timer).toBeInstanceOf(Timer);
		});
		it('should go and get the html from the mozilla site', (done) => {
			newRoom.html.then(() => {
				expect(newRoom.html).toBeDefined();
				expect(typeof newRoom.html).toBe('string');
				done();
			});
		});
	});

	describe('room methods', () => {
		describe('getPlayers', () => {
			let socketMessageResponse = null;
			const mockSocket = {
				id: 'test-id',
				join: () => {},
				emit: (eventName, payload) =>
					(socketMessageResponse = {
						eventName,
						payload
					})
			};

			it('should an empty playerList on first call', () => {
				const socketResponse = newRoom.getPlayers(mockSocket);
				expect(socketMessageResponse).toEqual({ eventName: 'returnPlayerList', payload: [] });
			});
			it('should a player if called after player add', () => {
				const mockPlayer = new Player(mockSocket, 'dave', 'dave.url');
				newRoom.addPlayer(mockSocket, mockPlayer);
				const socketResponse = newRoom.getPlayers(mockSocket);
				expect(socketMessageResponse).toEqual({ eventName: 'returnPlayerList', payload: [ mockPlayer ] });
			});
		});
		describe('addPlayer', () => {
			const mockPlayer = new Player(mockSocket, 'dave', 'dave.url');

			it('should add a player on the first call', () => {
				const newRoom = new Room(mockIO, roomName);
				expect(newRoom.playerList.length).toEqual(0);
				newRoom.addPlayer(mockSocket, mockPlayer);
				expect(newRoom.playerList.length).toEqual(1);
				expect(newRoom.playerList).toEqual([ mockPlayer ]);
			});
			it('should add an additional player for each call', () => {
				const newRoom = new Room(mockIO, roomName);
				expect(newRoom.playerList.length).toEqual(0);
				newRoom.addPlayer(mockSocket, mockPlayer);
				expect(newRoom.playerList.length).toEqual(1);
				newRoom.addPlayer(mockSocket, mockPlayer);
				expect(newRoom.playerList.length).toEqual(2);
				newRoom.addPlayer(mockSocket, mockPlayer);
				expect(newRoom.playerList.length).toEqual(3);
				newRoom.addPlayer(mockSocket, mockPlayer);
				expect(newRoom.playerList.length).toEqual(4);
			});
		});
		describe('removePlayer', () => {
			const newRoom = new Room(mockIO, roomName);
			const mockPlayer = new Player(mockSocket, 'dave', 'dave.url');

			it('should remove a player on the first call', () => {
				expect(newRoom.playerList.length).toEqual(0);
				newRoom.addPlayer(mockSocket, mockPlayer);
				expect(newRoom.playerList.length).toEqual(1);
				newRoom.removePlayer(mockSocket.id);
				expect(newRoom.playerList.length).toEqual(0);
			});
			it('should not go negative', () => {
				newRoom.addPlayer(mockSocket, mockPlayer);
				newRoom.removePlayer(mockSocket.id);
				newRoom.removePlayer(mockSocket.id);
				newRoom.removePlayer(mockSocket.id);
				expect(newRoom.playerList.length).toEqual(0);
			});
		});

		describe('updatePlayerList', () => {
			let roomEmitResponse = null;

			const mockIO = {
				to: (room) => {
					return {
						emit: (eventName, payload) => {
							roomEmitResponse = { eventName, payload, room };
						},
						binary: () => {
							return {
								emit: (eventName, payload) => {
									roomEmitResponse = { eventName, payload, room };
								}
							};
						},
						room
					};
				}
			};

			const mockSocket = {
				id: 'test-id',
				join: () => {},
				emit: (eventName, payload) => {
					eventName, payload;
				}
			};

			const roomName = 'test-room';

			const newRoom = new Room(mockIO, roomName);

			newRoom.updatePlayerlist();

			it('emit to the correct room', () => {
				expect(roomEmitResponse.room).toEqual(roomName);
			});
			it('emit the correct event name "updatePlayerList"', () => {
				newRoom.updatePlayerlist();
				expect(roomEmitResponse.eventName).toEqual('updatePlayerList');
			});
			it('emit the correct payload', () => {
				newRoom.updatePlayerlist();
				expect(roomEmitResponse.payload).toEqual([]);
			});
			it('should be called from the addPlayer method', () => {
				const mockPlayer = new Player(mockSocket, 'dave', 'dave.url');
				newRoom.addPlayer(mockSocket, mockPlayer);
				expect(roomEmitResponse.payload).toEqual([ mockPlayer.name ]);
			});
			it('should be called from the removePlayer method', () => {
				const mockPlayer = new Player(mockSocket, 'dave', 'dave.url');
				newRoom.addPlayer(mockSocket, mockPlayer);
				newRoom.removePlayer(mockSocket.id);
				expect(roomEmitResponse.payload).toEqual([]);
			});
		});
		xdescribe('submit vote', () => {
			let roomEmitResponse = null;
			const mockIO = {
				to: (room) => {
					return {
						emit: (eventName, payload) => {
							roomEmitResponse = { eventName, payload, room };
						},
						binary: () => {
							return {
								emit: (eventName, payload) => {
									roomEmitResponse = { eventName, payload, room };
								}
							};
						},
						room
					};
				}
			};

			const mockSocket1 = {
				id: 'test-id-1',
				join: () => {},
				emit: (eventName, payload) => {
					eventName, payload;
				}
			};
			const mockSocket2 = {
				id: 'test-id-2',
				join: () => {},
				emit: (eventName, payload) => {
					eventName, payload;
				}
			};
			const mockSocket3 = {
				id: 'test-id-3',
				join: () => {},
				emit: (eventName, payload) => {
					eventName, payload;
				}
			};

			const roomName = 'test-room';
			const mockPlayer1 = new Player(mockSocket1, 'dave', 'dave.url');
			const mockPlayer2 = new Player(mockSocket2, 'dave', 'dave.url');
			const mockPlayer3 = new Player(mockSocket3, 'dave', 'dave.url');

			const newRoom = new Room(mockIO, roomName);
			newRoom.addPlayer(mockSocket1, mockPlayer1);
			newRoom.addPlayer(mockSocket2, mockPlayer2);
			newRoom.addPlayer(mockSocket3, mockPlayer3);

			// it('should vote', () => {
			// 	expect(roomEmitResponse.room).toEqual(roomName);
			// });
		});
	});
});

describe('PLAYER Class', () => {
	const mockSocket = {
		id: 'test-id',
		join: () => {},
		emit: (eventName, payload) => {
			eventName, payload;
		}
	};

	const newPlayer = new Player(
		mockSocket,
		'Cameron',
		'https://media-exp1.licdn.com/dms/image/C4E03AQGlMsrn5ocS-Q/profile-displayphoto-shrink_400_400/0?e=1602720000&v=beta&t=oootzg6WkQxBZ4K8JhoS3vUFIDzV_bmbsn-eVKwiwZQ'
	);

	it('should create a player when constructed', () => {
		expect(newPlayer).toBeInstanceOf(Player);
		expect(newPlayer.name).toBe('Cameron');
		expect(newPlayer.socket).toBe(mockSocket);
		expect(newPlayer.wins).toBe(0);
		expect(newPlayer.pictureURL).toBe(
			'https://media-exp1.licdn.com/dms/image/C4E03AQGlMsrn5ocS-Q/profile-displayphoto-shrink_400_400/0?e=1602720000&v=beta&t=oootzg6WkQxBZ4K8JhoS3vUFIDzV_bmbsn-eVKwiwZQ'
		);
		expect(newPlayer.vote).toBe('');
	});

	it('should increase wins when a player wins', () => {
		newPlayer.incrementWin();
		expect(newPlayer.wins).toBe(1);
	});
});

describe('NODE Class', () => {
	const newNode = new DOMNode('shibas', 'button', 'toastedSquash');
	it('should create a new Node when constructed', () => {
		expect(newNode).toBeInstanceOf(DOMNode);
		expect(newNode.nodeID).toBe('shibas');
		expect(newNode.attribute).toBe('button');
		expect(newNode.value).toBe('toastedSquash');
	});
});

xdescribe('TIMER Class', () => {
	let roomEmitResponse = null;

	const mockIO = {
		to: (room) => {
			return {
				emit: (eventName, payload) => {
					roomEmitResponse = { eventName, payload, room };
				},
				binary: () => {
					return {
						emit: (eventName, payload) => {
							roomEmitResponse = { eventName, payload, room };
						}
					};
				},
				room
			};
		}
	};

	const mockSocket = {
		id: 'test-id',
		join: () => {},
		emit: (eventName, payload) => {
			eventName, payload;
		}
	};

	const roomName = 'test-room';
	const testRoom = new Room(mockIO, testRoom);
	const newTimer = new Timer(mockIO, testRoom);

	it('should create a new Timer when constructed', () => {
		expect(newTimer).toBeInstanceOf(Timer);
		expect(newTimer.io).toBe(mockIO);
		expect(newTimer.room).toBe(testRoom);
		expect(newTimer.time).toBe(0);
		expect(newTimer.cb).toEqual({});
	});

	it('should it set Countdown correctly', () => {
		let cb = () => console.log('countdown');
		newTimer.setCountdown(10, cb);
		expect(newTimer.time).toBe(10);
		expect(newTimer.cb).toBe(cb);
	});

	it('should countdown', () => {
		// 'use strict';
		jest.useFakeTimers();
		let cb = () => console.log('countdown');
		newTimer.setCountdown(10, cb);
		newTimer.runCountdown();
		console.log(newTimer.time);
		expect(setTimeout).toHaveBeenCalledTimes(10);
	});
});

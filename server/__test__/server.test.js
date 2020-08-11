// Define goals > fail > fix > repeat
const supertest = require('supertest');
const http = require('../server');

describe('GET /', () => {
	it('should serve static files', () => {
		return supertest(http).get('/').expect(200).expect('Content-Type', 'text/html; charset=UTF-8');
	});

	it('should create a new websocket connection', () => {
		expect(true).toBeTruthy();
	});
});

//- /:room (React router, if used)
// Goes directly to a socket room, but serves the static files also
//- /:room/site
//  Serves the current saved version of the changing site

describe('GET /room/:room', () => {
	// first the client goes to a route, which should return the index.html
	let room = 123;
	it('should serve static files', () => {
		return supertest(http).get(`/room/${room}`).expect(200).expect('Content-Type', 'text/html; charset=UTF-8');
	});
});
// client should send a joinRoom message through the socket, which should join the socket to a room

xdescribe('GET /:room/site', () => {});

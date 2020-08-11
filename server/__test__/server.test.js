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

describe('GET /:room', () => {
	let room = 123;
	it('should serve static files', () => {
		return supertest(http).get(`/${room}`).expect(200).expect('Content-Type', 'text/html; charset=UTF-8');
	});

	it('should direct to a socket room', () => {});
});

xdescribe('GET /:room/site', () => {});

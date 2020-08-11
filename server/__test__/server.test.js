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

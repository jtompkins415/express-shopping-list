process.env.NODE_ENV = 'test';

const request = require('supertest')
const app = require('../app')
const items = require('../fakeDB')

let newItem = {name: 'Cheetos', price: 2.50}

beforeEach(() => {
    items.push(newItem)    
});

afterEach(() => {
    items.length = 0
});

describe('GET /items' , () => {
    test('Does shopping list exist', async ()=> {
        const resp = await request(app).get('/items')
        expect(resp.statusCode).toBe(200);
    });
});
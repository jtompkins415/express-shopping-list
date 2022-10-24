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

describe('GET /items' , async () => {
    test('Does shopping list exist', async ()=> {
        const resp = await request(app).get('/items')
        expect(resp.statusCode).toBe(200);
        expect(items.length).toEqual(1);
    });
});

describe('GET /items/:name', async () => {
    test('retrieve single item', async () => {
        const resp = await request(app).get(`/item/${newItem.name}`)
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item).toEqual(newItem);
    });
    
    test('404 response if not found', async () => {
        const resp = await request(app).get('/item/0')
        expect(resp.statusCode).toBe(404)
    });
});

describe('PATCH /items/:name', async () => {
    test('update item name', async () => {
        const resp = await request(app).patch(`/item/${newItem.name}`)
        .send({name: "Fritos"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body.newItem).toEqual({name:"Fritos"});
    });

    test('404 response if not found', async () => {
        const resp = await request(app).patch('/item/0')
        expect(resp.statusCode).toBe(404)
    });
});

describe('POST /items', async () => {
    test('create new item', async () => {
        const resp = await request(app).post('/items')
        .send({
            name: "Pretzels",
            price: 2.50
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body.item.name).toEqual('Pretzels');
        expect(resp.body.item.price).toEqual(2.50)
    });
});

describe('DELETE /items/:name', async () => {
    test("delete single item", async () => {
        const resp = await request(app).delete(`/items/${newItem.name}`)
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted"})
    });
});
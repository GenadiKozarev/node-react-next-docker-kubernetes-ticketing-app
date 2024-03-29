import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
// Import the real natsWrapper to test that we are actually being given a mock of the natsWrapper, as per our tickets/src/test/setup.ts. See 'it('publishes an event''
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/tickets for POST requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10,
        })
        .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'testTitle',
            price: -10,
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'testTitle',
        })
        .expect(400);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    // Because we're deleting all collections in our test setup, we're expecting no tickets to be present
    expect(tickets.length).toEqual(0);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: 'testTitle', price: 20 })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
});

it('publishes an event', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: 'testTitle', price: 20 })
        .expect(201);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

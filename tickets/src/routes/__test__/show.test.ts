import request from 'supertest';
import { app } from '../../app';

it('returns 404 if the ticket is not found', async () => {
    await request(app)
        .get('/api/tickets/wrongNonExistingId')
        .send()
        .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
    // Create a ticket
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title: 'testTitle', price: 33 })
        .expect(201);

    // Get a ticket
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual('testTitle');
    expect(ticketResponse.body.price).toEqual(33);
});

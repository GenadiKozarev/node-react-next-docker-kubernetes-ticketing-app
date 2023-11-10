import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
// Import the real natsWrapper to test that we are actually being given a mock of the natsWrapper, as per our tickets/src/test/setup.ts. See 'it('publishes an event''
import { natsWrapper } from '../../nats-wrapper';

it('returns 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({ title: 'updatedTitle', price: 88 })
        .expect(404);
});

it('returns 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({ title: 'updatedTitle', price: 88 })
        .expect(401);
});

it('returns 401 if the user does not own the ticket', async () => {
    // Create a ticket and save the response for its id
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'testTitle',
            price: 55,
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        // Pretend that we're a different user by signing in with a newly generated id
        .set('Cookie', global.signin())
        .send({ title: 'some new random string', price: 99 })
        .expect(401);
});

it('returns 400 if the user provides an invalid title or price', async () => {
    // Save the cookie here to be able to imitate we're the same user
    const cookie = global.signin();

    // Create a ticket and save the response for its id
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'testTitle',
            price: 55,
        });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        // Use the saved cookie to prove we're the same user
        .set('Cookie', cookie)
        .send({ title: '', price: 55 })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        // Use the saved cookie to prove we're the same user
        .set('Cookie', cookie)
        .send({ title: 'testTitle', price: -3 })
        .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    // Save the cookie here to be able to imitate we're the same user
    const cookie = global.signin();

    // Create a ticket and save the response for its id
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'testTitle',
            price: 55,
        });

    // Edit a ticket
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100,
        })
        .expect(200);

    // Check the update ticket's details
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);
});

it('publishes an event', async () => {
    // Save the cookie here to be able to imitate we're the same user
    const cookie = global.signin();

    // Create a ticket and save the response for its id
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'testTitle',
            price: 55,
        });

    // Edit a ticket
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100,
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

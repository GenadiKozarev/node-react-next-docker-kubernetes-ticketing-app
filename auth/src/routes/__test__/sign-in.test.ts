import request from 'supertest';
import { app } from '../../app';

it('should fail when an email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'mail@mail.com',
            password: 'pass123',
        })
        .expect(400);
});

it('should fail when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'mail@mail.com',
            password: 'pass123',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'mail@mail.com',
            password: 'wrongpass',
        })
        .expect(400);
});

it('should respond with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'mail@mail.com',
            password: 'password',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'mail@mail.com',
            password: 'password',
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

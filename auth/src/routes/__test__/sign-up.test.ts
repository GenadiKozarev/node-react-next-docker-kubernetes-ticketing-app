import request from 'supertest';
import { app } from '../../app';

it('should return 201 on successful sign-up', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@mail.com',
            password: 'password',
        })
        .expect(201);
});

it('should return 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'invalidmail',
            password: 'password',
        })
        .expect(400);
});

it('should return 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@mail.com',
            password: '12',
        })
        .expect(400);
});

it('should return 400 with missing email and password', async () => {
    return request(app).post('/api/users/signup').send({}).expect(400);
});

it('should forbid email duplication', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@mail.com',
            password: 'password',
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@mail.com',
            password: 'password',
        })
        .expect(400);
});

it('should set a cookie after successful sign-up', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@mail.com',
            password: 'password',
        })
        .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});

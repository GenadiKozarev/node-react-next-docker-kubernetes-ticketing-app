import request from 'supertest';
import { app } from '../../app';

it('should respond with details about the current user', async () => {
    const signUpResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'current.user@mail.com',
            password: 'pass123',
        })
        .expect(201);
    const cookie = signUpResponse.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    console.log(response.body);
    expect(response.body.currentUser.email).toEqual('current.user@mail.com');
});

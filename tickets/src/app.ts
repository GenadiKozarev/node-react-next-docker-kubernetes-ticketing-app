import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@library-of-knowledge/common';

const app = express();
/* 
Make sure express is aware that is behind a proxy of ingress-nginx
and should still trust traffic as being secure even thou it's coming from that proxy
*/
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        // Disable encryption because the JWT is already encrypted
        signed: false,
        /*
        Cookies will only be used if the user is visiting via https connection
        and we're not in a test environment
        */
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
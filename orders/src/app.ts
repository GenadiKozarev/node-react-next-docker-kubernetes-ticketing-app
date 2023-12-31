import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@library-of-knowledge/common';

import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';

const app = express();
/* 
Make sure express is aware that is behind a proxy of ingress-nginx
and should still trust traffic as being secure even thou it's coming from that proxy
*/
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        // // Disable encryption because the JWT is already encrypted
        // signed: false,
        // // Cookies will only be used if the user is visiting via https connection and we're not in a test environment
        // secure: process.env.NODE_ENV !== 'test',
        signed: false,
        secure: false,
    })
);
app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };

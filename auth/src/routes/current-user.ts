import express from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    // If undefined, send null
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

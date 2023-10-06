import express from 'express';

import { currentUser } from '@library-of-knowledge/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    // If undefined, send null
    res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send('hey is currentUserRouter working?');
});

export { router as currentUserRouter };

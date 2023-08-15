import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.send('hey is signInRouter working?');
});

export { router as signInRouter };

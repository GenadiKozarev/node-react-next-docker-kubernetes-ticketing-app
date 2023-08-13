import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
    '/api/users/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 30 })
            .withMessage('Password must be between 4 and 30 characters'),
    ],
    (req: Request, res: Response) => {
        const errors = validationResult(req);
        // if the error's obj is not empty
        if(!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const { email, password } = req.body;

        console.log('Creating a user...');
        res.send({});
    }
);

export { router as signInRouter };

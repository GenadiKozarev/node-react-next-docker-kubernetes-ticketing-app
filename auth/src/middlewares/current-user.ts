import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// Augment the Request interface to be able to assign the payload to the currentUser
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    };

    try {
        /*
        Tell TypeScript that what we get back out of this verify() call is going to be equal to this interface
        */
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        
        req.currentUser = payload;
    } catch (err) {
        
    }

    // Whether or not we decode the token successfully, continue to the next middleware
    next();
}
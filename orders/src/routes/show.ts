import express, { Request, Response } from 'express';
import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth,
} from '@library-of-knowledge/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
    '/api/orders/:orderId',
    requireAuth,
    async (req: Request, res: Response) => {
        // Get the order and its associated ticket
        const order = await Order.findById(req.params.orderId).populate(
            'ticket'
        );

        if (!order) {
            throw new NotFoundError();
        }
        // If the user does NOT own this order
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        res.send(order);
    }
);

export { router as showOrderRouter };

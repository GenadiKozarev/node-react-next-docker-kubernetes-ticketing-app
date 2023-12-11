import express, { Request, Response } from 'express';
import { requireAuth } from '@library-of-knowledge/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({
        // filter by orders that are only related to the user making the request
        userId: req.currentUser!.id,
    }).populate('ticket');

    res.send(orders);
});

export { router as indexOrderRouter };

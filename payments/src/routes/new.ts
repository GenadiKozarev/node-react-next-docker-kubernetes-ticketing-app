import {
    BadRequestError,
    NotAuthorizedError,
    NotFoundError,
    OrderStatus,
    requireAuth,
    validateRequest,
} from '@library-of-knowledge/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { stripe } from '../stripe';
import { Order } from '../models/order';

const router = express.Router();

router.post(
    '/api/payments',
    requireAuth,
    [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
    validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;
        // find the order the user is trying to pay for
        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }
        // ensure the order belongs to this user
        if (order.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        // ensure the order is not yet cancelled
        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('Cannot pay for a cancelled order')
        }

        // https://stripe.com/docs/api/charges/create
        await stripe.charges.create({
            currency: 'usd',
            // stripe uses the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency)
            amount: order.price * 100,
            source: token,
        });

        res.status(201).send({ success: true });
        // TODO:
        // ensure the payment amount matches the amount due for the order
    }
);

export { router as createChargeRouter };

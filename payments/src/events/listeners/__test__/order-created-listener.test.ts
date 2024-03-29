import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@library-of-knowledge/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: 'dnm',
        userId: 'dnm',
        status: OrderStatus.Created,
        ticket: {
            id: 'dnm',
            price: 120,
        },
    };
    // create a fake msg object
    // @ts-ignore - because we need only one of the required Message properties
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, data, msg };
};

it('replicates the order info', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
});

it('ack(nowledge)s the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCreatedEvent, OrderStatus } from '@library-of-knowledge/common';
import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // create an instance of the Listener
    const listener = new OrderCreatedListener(natsWrapper.client);
    // create an save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'does-not-matter',
    });
    await ticket.save();
    // create the fake data event
    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'does-not-matter',
        expiresAt: 'does-not-matter',
        ticket: {
            id: ticket.id,
            price: ticket.price,
        },
    };
    // create a fake message object
    // @ts-ignore - because we need only one of the required Message properties
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, ticket, data, msg };
};

it('sets the userId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks (acknowledges) the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    // get the data that was published
    const ticketUpdatedData = JSON.parse(
        (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
    // compare the ticket id from the published event with the ticket id from the data event
    expect(data.id).toEqual(ticketUpdatedData.orderId);
});

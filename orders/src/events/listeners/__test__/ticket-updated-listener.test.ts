import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketUpdatedEvent } from '@library-of-knowledge/common';
import { TicketUpdatedListener } from '../ticket-updated-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);
    // create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 30,
    });
    await ticket.save();
    // create a fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'updated concert title',
        price: 333,
        userId: 'does-not-matter',
    };
    // create a fake msg object
    // @ts-ignore - because we need only one of the required Message properties
    const msg: Message = {
        ack: jest.fn(),
    };
    // return all
    return { msg, data, ticket, listener };
};

it('finds, updates and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);
});

it('acks (acknowledges) the message', async () => {
    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('does NOT acknowledge an event with a wrong/skipped/future version number', async () => {
    const { msg, data, ticket, listener } = await setup();

    // assign a wrong/skipped/future version number
    data.version = 10;

    try {
        await listener.onMessage(data, msg);
    } catch (err) {}

    expect(msg.ack).not.toHaveBeenCalled();
});

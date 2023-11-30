import { Message } from 'node-nats-streaming';
import {
    Listener,
    OrderCreatedEvent,
    Subjects,
} from '@library-of-knowledge/common';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);
        // if no ticket, throw error
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        // mark ticket as locked/reserved by setting its orderId property
        ticket.set({ orderId: data.id });
        // save ticket
        await ticket.save();
        // publish an event with the updated ticket (if there is an orderId, it means it is reserved)
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version,
        });
        // ack the message
        msg.ack();
    }
}

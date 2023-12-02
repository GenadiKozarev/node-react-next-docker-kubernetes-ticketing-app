import {
    Listener,
    OrderCreatedEvent,
    Subjects,
} from '@library-of-knowledge/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // add a job to the queue
        await expirationQueue.add({
            orderId: data.id,
        });

        msg.ack();
    }
}

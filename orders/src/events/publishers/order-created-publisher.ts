import {
    Publisher,
    OrderCreatedEvent,
    Subjects,
} from '@library-of-knowledge/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}

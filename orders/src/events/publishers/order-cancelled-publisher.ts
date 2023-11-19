import {
    Publisher,
    OrderCancelledEvent,
    Subjects,
} from '@library-of-knowledge/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}

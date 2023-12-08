import {
    PaymentCreatedEvent,
    Publisher,
    Subjects,
} from '@library-of-knowledge/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}

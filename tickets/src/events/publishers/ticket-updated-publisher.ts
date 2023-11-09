import { Publisher, Subjects, TicketUpdatedEvent } from '@library-of-knowledge/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}
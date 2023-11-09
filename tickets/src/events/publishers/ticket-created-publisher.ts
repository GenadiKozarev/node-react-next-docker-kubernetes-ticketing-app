import { Publisher, Subjects, TicketCreatedEvent } from '@library-of-knowledge/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
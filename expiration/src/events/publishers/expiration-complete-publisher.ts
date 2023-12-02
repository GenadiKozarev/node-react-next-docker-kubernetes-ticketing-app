import {
    ExpirationCompleteEvent,
    Publisher,
    Subjects,
} from '@library-of-knowledge/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}

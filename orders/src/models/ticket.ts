import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';

// list of properties required to build a ticket
interface TicketAttrs {
    id: string;
    title: string;
    price: number;
}
// list of properties that a ticket has
export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    isReserved(): Promise<boolean>;
}
// list of properties the model itself contains
interface TicketModel extends mongoose.Model<TicketDoc> {
    // accepts an argument of type OrderAttrs and returns something of type OrderDoc
    build(attrs: TicketAttrs): TicketDoc;
    // Function to find by id and a previous version
    findByEvent(event: {
        id: string;
        version: number;
    }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

// Update the default mongodb '__v' to be 'version'
ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Ticket.findOne({
        _id: event.id,
        version: event.version - 1,
    });
};
ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket({
        _id: attrs.id,
        title: attrs.title,
        price: attrs.price,
    });
};
// Run query to look at all orders based on a ticket provided AND the order status is NOT cancelled.
// If we find an order from this, that means the ticket is reserved.
ticketSchema.methods.isReserved = async function () {
    // this === the ticket document that we just called 'isReserved' on
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete,
            ],
        },
    });

    return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };

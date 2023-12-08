import mongoose from 'mongoose';

// list of properties required to build a payment
interface PaymentAttrs {
    orderId: string;
    stripeId: string;
}
// list of properties that a payment has
interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
}
// list of properties the model itself contains
interface PaymentModel extends mongoose.Model<PaymentDoc> {
    // accepts an argument of type OrderAttrs and returns the OrderDoc object properties
    build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            required: true,
            type: String,
        },
        stripeId: {
            required: true,
            type: String,
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

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
    return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
    'Payment',
    paymentSchema
);

export { Payment };

import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: () => Router.push('/orders'),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const secondsLeft = (new Date(order.expiresAt) - new Date()) / 1000;
            setTimeLeft(Math.round(secondsLeft));
        };
        // call this function once because setInterval will start 'after 1 second' and we want to show the timer immediately
        findTimeLeft();
        // calculate time once per second
        const timerId = setInterval(findTimeLeft, 1000);
        // This return statement returns a cleanup function that cancels the interval used to calculate the time left to pay.
        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return <div>Order expired</div>
    }

    return (
        <div>
            Time left to pay: {timeLeft} seconds - 
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })}
                stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                // the amount to be paid, convert from cents to dollars
                amount={order.ticket.price * 100}
                email={currentUser.email}
            />
            {errors}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    // whatever the name of this file inside the square brackets, is part of the query
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    // the returned order will be merged to the props of 'OrderShow' => it can be passed in as an argument
    return { order: data };
};

export default OrderShow;

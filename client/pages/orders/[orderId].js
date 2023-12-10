import { useEffect, useState } from 'react';

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState(0);
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

    return <div>Time left to pay: {timeLeft} seconds</div>;
};

OrderShow.getInitialProps = async (context, client) => {
    // whatever the name of this file inside the square brackets, is part of the query
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);
    // the returned order will be merged to the props of 'OrderShow' => it can be passed in as an argument
    return { order: data };
};

export default OrderShow;

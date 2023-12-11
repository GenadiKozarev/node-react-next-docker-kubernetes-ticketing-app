const OrderIndex = ({ orders }) => {
    return (
        <ul>
            {orders.map(order => {
                return (
                    <li key={order.id}>
                        Ticket: {order.ticket.title} - Order status: {order.status}
                    </li>
                );
            })}
        </ul>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return { orders: data };
};

export default OrderIndex;

const OrderIndex = ({ orders }) => {
    return (
        <div className='text-center'>
            <ul className='list-group list-unstyled'>
                {orders.map(order => {
                    return (
                        <li key={order.id} className='list-group-item list-group-item-warning'>
                            Ticket: {order.ticket.title} - Order status:{' '}
                            {order.status}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/orders');

    return { orders: data };
};

export default OrderIndex;

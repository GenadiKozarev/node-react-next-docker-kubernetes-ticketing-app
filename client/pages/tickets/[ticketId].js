import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const TicketShow = ({ ticket }) => {
    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        // first argument: pass in the filename path inside the '/pages' directory
        // second argument: the actual URL
        onSuccess: order =>
            Router.push('/orders/[orderId]', `/orders/${order.id}`),
    });

    return (
        <div>
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
            {errors}
            <button onClick={() => doRequest()} className='btn btn-primary'>
                Purchase
            </button>
        </div>
    );
};

TicketShow.getInitialProps = async (context, client) => {
    // whatever the name of this file inside the square brackets, is part of the query
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);
    // the returned ticket will be merged to the props of 'TicketShow' => it can be passed in as an argument
    return { ticket: data };
};

export default TicketShow;

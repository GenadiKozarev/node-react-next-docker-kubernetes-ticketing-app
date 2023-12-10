const TicketShow = ({ ticket }) => {
    return (
        <div>
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
        </div>
    );
};

TicketShow.getInitialProps = async (context, client) => {
    // whatever the name of this file inside the square brackets, is part of the query
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);
    // the returned ticket will be merged to the props of const TicketShow
    return { ticket: data };
};

export default TicketShow;

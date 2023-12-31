import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link
                        href='/tickets/[ticketId]'
                        as={`/tickets/${ticket.id}`}
                    >
                        view
                    </Link>
                </td>
            </tr>
        );
    });
    return (
        <div>
            <h2>Tickets</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { data } = await client.get('/api/tickets');
    // the returned value which is an array of tickets will be merged with the LandingPage's arguments
    return { tickets: data };
};

export default LandingPage;

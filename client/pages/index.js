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
                        className='btn btn-warning'
                    >
                        view
                    </Link>
                </td>
            </tr>
        );
    });
    return (
        <div className='mt-5'>
            <h2 className='text-primary text-center mb-5'>Tickets</h2>
            <table className='table table-hover'>
                <thead>
                    <tr className='table-primary'>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody className='table-warning align-middle'>{ticketList}</tbody>
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

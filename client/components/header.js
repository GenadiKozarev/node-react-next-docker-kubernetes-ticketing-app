import Link from 'next/link';

const Header = ({ currentUser }) => {
    // if a user is logged in or not, add a label and link
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
        currentUser && { label: 'My Orders', href: '/orders' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ]
        // filter out any false entries
        .filter(linkConfig => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href} className='nav-item'>
                    <Link href={href} className='nav-link mx-2'>
                        {label}
                    </Link>
                </li>
            );
        });

    return (
        <nav className='navbar bg-warning'>
            <Link className='navbar-brand text-primary ms-3' href='/'>
                TicketingApp
            </Link>

            <div className='d-flex justify-content-end'>
                <ul className='nav d-flex align-items-center'>{links}</ul>
            </div>
        </nav>
    );
};

export default Header;

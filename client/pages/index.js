const LandingPage = ({ currentUser }) => {
    return <h1>You {currentUser ? 'are' : 'are not'} signed in</h1>;
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    return {};
};

export default LandingPage;

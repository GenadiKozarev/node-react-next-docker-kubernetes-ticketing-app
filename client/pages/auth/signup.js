import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        method: 'post',
        url: '/api/users/signup',
        body: { email, password },
        onSuccess: () => Router.push('/'),
    });

    const handleSubmit = async e => {
        e.preventDefault();

        await doRequest();
    };

    return (
        <form onSubmit={handleSubmit} className='mt-5 w-50 mx-auto d-block text-primary'>
            <h2 className='text-center text-primary'>Sign Up</h2>
            <div className='form-group mt-5'>
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='form-control text-primary mt-2'
                />
            </div>
            <div className='form-group mt-3'>
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type='password'
                    className='form-control text-primary mt-2'
                />
            </div>
            {errors}
            <button className='btn btn-primary mt-3'>Sign Up</button>
        </form>
    );
};

export default SignUp;

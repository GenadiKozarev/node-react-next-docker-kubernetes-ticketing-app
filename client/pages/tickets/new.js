import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price,
        },
        // upon ticket creation, send the user to the home page
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = event => {
        event.preventDefault();
        doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    return (
        <div className='mt-5'>
            <h2 className='text-center text-primary'>Create a Ticket</h2>
            <form onSubmit={onSubmit} className='mt-3 w-50 mx-auto d-block text-primary'>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='form-control text-primary mt-2'
                    />
                </div>
                <div className='form-group mt-3'>
                    <label>Price</label>
                    <input
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        onBlur={onBlur}
                        className='form-control text-primary mt-2'
                    />
                </div>
                {errors}
                <button className='btn btn-primary mt-3'>Submit</button>
            </form>
        </div>
    );
};

export default NewTicket;

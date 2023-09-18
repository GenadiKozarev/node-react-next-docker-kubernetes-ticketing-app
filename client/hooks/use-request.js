import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ method, url, body }) => {
    const [errors, setErrors] = useState(null);

    const handleRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            return response.data;
        } catch (err) {
            setErrors(
                <div className='alert alert-danger'>
                    <h4>Ooops...</h4>
                    <ul className='my-0'>
                        {err.response.data.errors.map(err => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { handleRequest, errors };
};

export default useRequest;

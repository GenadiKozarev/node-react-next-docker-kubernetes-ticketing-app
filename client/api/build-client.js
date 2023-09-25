import axios from 'axios';

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server
        // create a pre-configured version of axios
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // we must be on the browser
        // create a pre-configured version of axios
        return axios.create({
            baseURL: '/'
        });
    }
};

export default buildClient;

import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://my-python-server-vm3c.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;
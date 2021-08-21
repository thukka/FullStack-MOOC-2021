import axios from 'axios';
const baseUrl = '/api/login';

const getUsers = async () => {
    const response = await axios.get('/api/users');
    return response.data;
};

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

export default { getUsers, login };
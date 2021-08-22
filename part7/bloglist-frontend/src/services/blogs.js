import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const newBlog = async newBlog => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newBlog, config);
    return response.data;
};

const editBlog = async (id, newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config);
    return response.data;
};

const removeBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

const getComments = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`);
    return response.data;
};


export default { getAll, newBlog, setToken, editBlog, removeBlog, getComments };
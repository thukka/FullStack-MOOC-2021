import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (NewName) => {
    const request = axios.post(baseUrl, NewName)
    return request.then(response => response.data)
}

const removeUser = (personId) => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const updateInfo = (personId, changedUser) => {
    const request = axios.put(`${baseUrl}/${personId}`, changedUser)
    return request.then(response => response.data)
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { getAll, create, removeUser, updateInfo }
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

const removeUser = ( personId ) => {
    console.log(`${baseUrl}/${personId}`)
    // const request = axios.delete(`${baseUrl}/${personId}`)
    
}

export default { getAll, create, removeUser }
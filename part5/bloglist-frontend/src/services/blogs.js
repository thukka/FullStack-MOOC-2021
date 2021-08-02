import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = {
  headers: { Authorization: token },
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const editBlog = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}


export default { getAll, newBlog, setToken, editBlog }
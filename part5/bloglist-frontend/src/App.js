import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'

const logOut = () => {
  window.localStorage.clear()
  window.location.reload()
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <>
        <Notification message={message} setMessage={setMessage} isError={isError} setIsError={setIsError} />
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setMessage={setMessage} setIsError={setIsError} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} setMessage={setMessage} isError={isError} setIsError={setIsError} />
      <p>{user.name} logged in
      <button onClick={logOut}>log out</button>
      </p>
      <NewBlog blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
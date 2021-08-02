import React, { useState, useEffect } from 'react'
// components
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// services
import blogService from './services/blogs'

const logOut = () => {
  window.localStorage.clear()
  window.location.reload()
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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
        <LoginForm setUser={setUser} setMessage={setMessage} setIsError={setIsError} />
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
      <Togglable buttonLabel='create new blog'>
        <NewBlog blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
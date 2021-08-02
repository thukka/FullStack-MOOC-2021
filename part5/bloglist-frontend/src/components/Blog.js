import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [additionalInfo, setAdditionalInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleAdditionalInfo = () => setAdditionalInfo(!additionalInfo)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogLike = () => {
    const likedBlog = {
      'title': blog.title,
      'likes': likes + 1,
      'author': blog.author,
      'url': blog.url,
      'user': blog.user,
      'id': blog.id
    }

    blogService.editBlog(blog.id, likedBlog)
    setLikes(likes + 1)
  }

  const removeBlog = () => {
    const blogId = blog.id
    if (window.confirm(`delete ${blog.title} ?`)) {
      blogService.removeBlog(blogId)
    }

    blogs = blogs.filter(b => !(b.id === blogId))
    setBlogs(blogs)
  }

  const BasicInfoLayout = () => (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleAdditionalInfo}>view</button>
    </div>
  )

  const AddInfoLayout = () => (
    <div style={blogStyle}>
      <p>{blog.title}
      <button onClick={toggleAdditionalInfo}>hide</button>
      </p>
      <p>{blog.url}</p>
      <p>likes {likes}
      <button onClick={blogLike}>like</button>
      </p>
      <p>{blog.author}</p>
      {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}
    </div>
  )

  if (additionalInfo === true) {
    return (
      AddInfoLayout()
    )
  }

  return (
    BasicInfoLayout()
  )

}

export default Blog
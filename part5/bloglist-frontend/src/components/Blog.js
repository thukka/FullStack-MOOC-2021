import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [additionalInfo, setAdditionalInfo] = useState(false)

  const toggleAdditionalInfo = () => setAdditionalInfo(!additionalInfo)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      <p>likes {blog.likes}
      <button onClick={() => console.log('like clicked')}>like</button>
      </p>
      <p>{blog.author}</p>
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
import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        console.log('BLOG CREATED')
        const newBlog = {
            'title': title,
            'author': author,
            'url': url,
        }
        blogService.newBlog(newBlog)
            .then(returnedBlog => {
                console.log('returned blog:', returnedBlog)
                setBlogs(blogs.concat(returnedBlog))
            })
        
       setTitle('')
       setAuthor('')
       setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog} id='create-new-blog'><p>
                title:
                    <input type='text'
                    name='Title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)} /></p>
                <p>
                    author:
                    <input type='text'
                        name='Author'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)} />
                </p>
                <p>
                    url:
                    <input type='text'
                        name='URL'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)} />
                </p>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewBlog
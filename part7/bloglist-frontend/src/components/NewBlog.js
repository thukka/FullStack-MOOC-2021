import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlog = ({ newBlogHandle }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = (event) => {
        event.preventDefault();
        const newBlog = {
            'title': title,
            'author': author,
            'url': url,
        };
        newBlogHandle(newBlog);
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog} id='create-new-blog'><p>
                title:
                <input type='text'
                    name='Title'
                    id='title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)} /></p>
            <p>
                    author:
                <input type='text'
                    name='Author'
                    id='author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)} />
            </p>
            <p>
                    url:
                <input type='text'
                    name='URL'
                    id='URL'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)} />
            </p>
            <button id='submit-blog' type='submit'>create</button>
            </form>
        </div>
    );
};

NewBlog.propTypes = {
    newBlogHandle: PropTypes.func.isRequired
};

export default NewBlog;
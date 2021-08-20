import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { setNotification, resetNotification } from '../reducers/notificationReducer';

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();

    const createBlog = (event) => {
        event.preventDefault();
        const newBlog = {
            'title': title,
            'author': author,
            'url': url,
        };
        dispatch(addBlog(newBlog));
        dispatch(setNotification(`a new blog ${newBlog.title} was added`, false));
        setTimeout(() => {
            dispatch(resetNotification());
        }, 5000);
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

export default NewBlog;
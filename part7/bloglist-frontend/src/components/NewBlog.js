import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogReducer';
import { setNotification, resetNotification } from '../reducers/notificationReducer';
import { Input, Button } from '@material-ui/core';

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();

    const createBlog = async (event) => {
        event.preventDefault();
        const newBlog = {
            'title': title,
            'author': author,
            'url': url,
        };
        let dispatchblog = await dispatch(addBlog(newBlog));
        if (dispatchblog === false) {
            dispatch(setNotification('Error creating a new blog! Token might have expired, please relog.', true));
            setTimeout(() => {
                dispatch(resetNotification());
            }, 10000);
        } else {
            dispatch(setNotification(`a new blog ${newBlog.title} was added`, false));
            setTimeout(() => {
                dispatch(resetNotification());
            }, 5000);
            setTitle('');
            setAuthor('');
            setUrl('');
        }
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createBlog} id='create-new-blog'>
                title:
                <Input type='text'
                    name='Title'
                    id='title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)} />
                    author:
                <Input type='text'
                    name='Author'
                    id='author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)} />
                    url:
                <Input type='text'
                    name='URL'
                    id='URL'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)} />
                <Button color='primary' variant='outlined' id='submit-blog' type='submit'>create</Button>
            </form>
        </div>
    );
};

export default NewBlog;
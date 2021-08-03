import React, { useState, useEffect } from 'react';
// components
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
// services
import blogService from './services/blogs';
import loginService from './services/login';

const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
};

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLoginApp = async (username, password) => {
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
        } catch (exception) {
            setIsError(true);
            setMessage('Wrong username or password');
            setTimeout(() => {
                setMessage(null);
                setIsError(false);
            }, 5000);
        }
    };

    if (user === null) {
        return (
            <>
                <Notification message={message} isError={isError} />
                <LoginForm handleLoginApp={handleLoginApp} />
            </>
        );
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message} isError={isError} />
            <p>{user.name} logged in
                <button onClick={logOut}>log out</button>
            </p>
            <Togglable buttonLabel='create new blog'>
                <NewBlog blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
            </Togglable>
            {
                blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
                )
            }
        </div>
    );
};

export default App;
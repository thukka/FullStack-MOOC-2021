import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
// redux actions
import { initBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const logOut = () => {
    window.localStorage.clear();
    window.location.reload();
};

const App = () => {
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initBlogs());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }
    }, []);

    // renders
    if (user === null) {
        return (
            <>
                <Notification />
                <LoginForm />
            </>
        );
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>{user.name} logged in
                <button onClick={logOut}>log out</button>
            </p>
            <Togglable buttonLabel='create new blog'>
                <NewBlog />
            </Togglable>
            <div className='show-blog-list'>
                {
                    blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                        <Blog key={blog.id} blog={blog} user={user} />
                    )
                }
            </div>
        </div>
    );
};

export default App;
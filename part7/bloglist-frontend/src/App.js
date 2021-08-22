import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import Blog from './components/Blog';
import SingleBlogView from './components/SingleBlog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users, { SingleUserView } from './components/Users';
import TopNav from './components/TopNav';
// redux actions
import { initBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';
// react-router
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const App = () => {
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.user);
    const [comments, setComments] = useState(null);

    const dispatch = useDispatch();

    const match = useRouteMatch('/blogs/:id');
    const singleBlog = match ? blogs.find(b => b.id === match.params.id) : null;

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
            <TopNav />
            <h2>blogs</h2>
            <Notification />

            <Switch>
                <Route path='/users/:id'>
                    <SingleUserView blogs={blogs} />
                </Route>
                <Route path='/blogs/:id'>
                    <SingleBlogView blog={singleBlog} comments={comments} setComments={setComments} />
                </Route>
                <Route path='/users' component={Users} />
                <Route path='/'>
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
                </Route>
            </Switch>
        </div>
    );
};

export default App;
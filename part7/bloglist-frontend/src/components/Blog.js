import React from 'react';
import PropTypes from 'prop-types';
import { removeBlog as RemoveBlogReducer } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TableCell } from '@material-ui/core';

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch();

    const removeBlog = () => {
        const blogId = blog.id;
        if (window.confirm(`delete ${blog.title} ?`)) {
            dispatch(RemoveBlogReducer(blogId));
        }
    };

    // layouts and render
    const BasicInfoLayout = () => (
        <>
            <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </TableCell>
            <TableCell>{blog.author}</TableCell>
            <TableCell>{blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}</TableCell>
        </>
    );

    return (
        BasicInfoLayout()
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default Blog;
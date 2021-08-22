import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { removeBlog as RemoveBlogReducer, likeBlog } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Blog = ({ blog, user }) => {
    const [additionalInfo, setAdditionalInfo] = useState(false);
    const dispatch = useDispatch();

    const toggleAdditionalInfo = () => setAdditionalInfo(!additionalInfo);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    // functions
    const blogLike = () => {
        const likedBlog = { ...blog, likes: blog.likes + 1 };
        dispatch(likeBlog(likedBlog));
    };

    const removeBlog = () => {
        const blogId = blog.id;
        if (window.confirm(`delete ${blog.title} ?`)) {
            dispatch(RemoveBlogReducer(blogId));
        }
    };

    // layouts and render
    const BasicInfoLayout = () => (
        <div style={blogStyle} className='blog'>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link><button onClick={toggleAdditionalInfo}>view</button>
        </div>
    );

    const AddInfoLayout = () => (
        <div style={blogStyle} className='addInfoLayout'>
            <p>{blog.title}
                <button onClick={toggleAdditionalInfo}>hide</button>
            </p>
            <p>{blog.url}</p>
            <p>likes {blog.likes}
                <button onClick={blogLike}>like</button>
            </p>
            <p>{blog.author}</p>
            {blog.user.username === user.username && <button onClick={removeBlog}>remove</button>}
        </div>
    );

    if (additionalInfo === true) {
        return (
            AddInfoLayout()
        );
    }

    return (
        BasicInfoLayout()
    );

};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default Blog;
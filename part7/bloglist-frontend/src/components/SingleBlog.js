import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogReducer';
import blogService from '../services/blogs';

const SingleBlogView = ({ blog, comments, setComments }) => {
    const dispatch = useDispatch();

    if (blog === undefined) {
        return null;
    }

    useEffect(async () => {
        const fetchedComments = await blogService.getComments(blog.id);
        setComments(fetchedComments);
    }, []);

    return (
        <>
            <p><a href={blog.url}>{blog.url}</a></p>
            <p>{blog.title}</p>
            <p>likes {blog.likes}
                <button onClick={() => dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))}>like</button>
            </p>
            <p>{blog.author}</p>
            <h2>comments</h2>
            {comments !== null &&
                <ul>{
                    comments.map(comment => {
                        return <li key={comment.id}>{comment.content}</li>;
                    })}
                </ul>
            }
        </>
    );
};

export default SingleBlogView;
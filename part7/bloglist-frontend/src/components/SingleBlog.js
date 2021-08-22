import React from 'react';
import { Input, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogReducer';
import blogService from '../services/blogs';

const SingleBlogView = ({ blog, comments, setComments }) => {
    const dispatch = useDispatch();


    if (blog === undefined) {
        return null;
    }

    const initializeBlogComments = async (blogId) => {
        const fetchedComments = await blogService.getComments(blogId);
        setComments(fetchedComments);
    };

    initializeBlogComments(blog.id);

    const addComment = async (event) => {
        event.preventDefault();
        const content = event.target.inputComment.value;
        event.target.inputComment.value = '';
        const comment = {
            'content': content,
        };
        const newComment = await blogService.postComment(blog.id, comment);
        setComments(comments.concat(newComment));
    };

    return (
        <>
            <p><a href={blog.url}>{blog.url}</a></p>
            <p>{blog.title}</p>
            <p>likes {blog.likes}
                <button onClick={() => dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }))}>like</button>
            </p>
            <p>{blog.author}</p>
            <h2>comments</h2>
            <form onSubmit={addComment}>
                <Input name='inputComment' /> <Button type='submit'>add comment</Button>
            </form>
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
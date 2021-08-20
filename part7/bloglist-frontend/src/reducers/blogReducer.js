import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS':
        return action.data;
    case 'ADD_BLOG': {
        return state.concat(action.blog);
    }
    case 'LIKE_BLOG':
        return state.map(blog => blog.id !== action.likedBlog.id ? blog : action.likedBlog);
    case 'REMOVE_BLOG':
        return state.filter(blog => blog.id !== action.blogId);
    default: return state;
    }
};

// actions

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        });
    };
};

export const addBlog = (blog) => {
    return async dispatch => {
        const postBlog = await blogService.newBlog(blog);
        dispatch({
            type: 'ADD_BLOG',
            blog: postBlog
        });
    };
};

export const removeBlog = (blogId) => {
    return async dispatch => {
        await blogService.removeBlog(blogId);
        dispatch({
            type: 'REMOVE_BLOG',
            blogId
        });
    };
};

export const likeBlog = (likedBlog) => {
    return async dispatch => {
        await blogService.editBlog(likedBlog.id, likedBlog);
        dispatch({
            type: 'LIKE_BLOG',
            likedBlog
        });
    };
};

export default blogReducer;
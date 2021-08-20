import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
    console.log('action received: ', action, 'state is: ', state);
    switch (action.type) {
    case 'INIT_BLOGS':
        return action.data;
    case 'ADD_BLOG': {
        return state.concat(action.blog);
    }
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

export default blogReducer;
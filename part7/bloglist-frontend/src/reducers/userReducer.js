import loginService from '../services/login';
import blogService from '../services/blogs';
import { setNotification, resetNotification } from './notificationReducer';

const userReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN_USER':
        window.localStorage.setItem(
            'loggedBlogUser', JSON.stringify(action.user)
        );
        blogService.setToken(action.user.token);
        return action.user;

    case 'SET_USER':
        return action.user;

    default: return state;
    }
};

export const loginUser = (username, password) => {
    return async dispatch => {
        let user;
        try {
            user = await loginService.login({ username, password });
            dispatch({
                type: 'LOGIN_USER',
                user
            });
        } catch (exception) {
            dispatch(setNotification('Wrong username or password', true));
            setTimeout(() => {
                dispatch(resetNotification());
            }, 5000);
        }
    };
};

export const setUser = (user) => {
    return async dispatch => {
        blogService.setToken(user.token);
        dispatch({
            type: 'SET_USER',
            user
        });
    };
};

export default userReducer;
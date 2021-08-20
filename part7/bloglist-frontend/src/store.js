import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';

const reducers = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
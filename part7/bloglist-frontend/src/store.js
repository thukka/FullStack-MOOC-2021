import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() => {
    console.log(store.getState());
});

export default store;
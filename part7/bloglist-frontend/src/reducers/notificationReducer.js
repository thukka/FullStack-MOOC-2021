const initialState = {
    msg: null,
    isError: false
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_NOTIFICATION': {
        let newNotification = {
            msg: action.msg,
            isError: action.isError,
        };
        return newNotification;
    }
    case 'RESET_NOTIFICATION':
        return { msg: null, isError: false };
    default: return state;
    }
};

// action creators

export const setNotification = (msg, isError) => {
    return {
        type: 'SET_NOTIFICATION',
        msg,
        isError
    };
};

export const resetNotification = () => {
    return {
        type: 'RESET_NOTIFICATION'
    };
};

export default notificationReducer;
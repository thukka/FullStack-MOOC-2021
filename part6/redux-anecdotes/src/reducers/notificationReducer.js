
const notificationReducer = (state = '', action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification.toString()
        case 'RESET_NOTIFICATION':
            return ''
        default: return state
    }

}


export const setNotification = (text, time) => {
    let timeInMilliSeconds = (time * 1000)
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: text
        })
        setTimeout(() => {
            dispatch({ type: 'RESET_NOTIFICATION' })
        }, timeInMilliSeconds)
    }
}

export const resetNotification = () => {
    return (
        {
            type: 'RESET_NOTIFICATION'
        }
    )
}

export default notificationReducer
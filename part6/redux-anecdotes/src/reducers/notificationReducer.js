let resetNotificationTimer;

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
    let timeInMilliseconds = (time * 1000)
    clearTimeout(resetNotificationTimer)

    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification: text
        })

        resetNotificationTimer = setTimeout(() => {
            dispatch({ type: 'RESET_NOTIFICATION' })
        }, timeInMilliseconds)
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
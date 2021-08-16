
const notificationReducer = (state = '', action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification.toString()
        default: return state
    }

}

export const setNotification = (notification) => {
    return (
        {
            type: 'SET_NOTIFICATION',
            notification
        }
    )
}

export default notificationReducer
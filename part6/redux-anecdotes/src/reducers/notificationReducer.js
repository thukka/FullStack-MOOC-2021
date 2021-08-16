
const notificationReducer = (state = '', action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification.toString()
        case 'RESET_NOTIFICATION':
            return ''
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

export const resetNotification = () => {
    return (
        {
            type: 'RESET_NOTIFICATION'
        }
    )
}

export default notificationReducer
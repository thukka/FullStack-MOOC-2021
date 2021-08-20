import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(state => state.notification);

    const notificationStyle = {
        color: 'green',
        border: '3px dashed black',
        margin: 'auto',
        width: '50%',
        padding: '10px'
    };

    if (notification.isError === true) {
        notificationStyle.color = 'red';
    }

    if (notification.msg === null) {
        return null;
    }

    return (
        <div style={notificationStyle}>
            {notification.msg}
        </div>
    );
};

export default Notification;
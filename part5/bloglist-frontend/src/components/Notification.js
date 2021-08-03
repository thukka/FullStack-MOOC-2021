import React from 'react';

const Notification = ({ message, isError }) => {

    const notificationStyle = {
        color: 'green',
        border: '3px dashed black',
        margin: 'auto',
        width: '50%',
        padding: '10px'
    };
    if (isError === true) {
        notificationStyle.color = 'red';
    }

    if (message === null) {
        return null;
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;
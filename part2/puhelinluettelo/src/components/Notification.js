import React from 'react'

const Notification = ({ message, isError }) => {
    if (message === null) {
      return null;
    }
  
    const StyleSuccess = {
      color: 'green',
      fontSize: 24,
      borderStyle: 'solid',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    }
  
    const ErrorStyle = {...StyleSuccess, color: 'red'}
  
    if (isError === true) {
      return (
        <div style={ErrorStyle}>
          {message}
        </div>
      )
    }
  
    return (
      <div style={StyleSuccess}>
        {message}
      </div>
    )
  }

export default Notification
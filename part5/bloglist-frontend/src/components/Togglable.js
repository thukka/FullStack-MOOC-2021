import React, { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hiddenStyle = { display: visible ? 'none' : '' }
    const visibleStyle = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    return (
        <div>
            <div style={hiddenStyle}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={visibleStyle}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable
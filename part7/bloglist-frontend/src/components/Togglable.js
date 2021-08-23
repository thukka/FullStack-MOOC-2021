import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Togglable = (props) => {
    const [visible, setVisible] = useState(false);

    const hiddenStyle = { display: visible ? 'none' : '' };
    const visibleStyle = { display: visible ? '' : 'none' };

    const toggleVisibility = () => setVisible(!visible);

    return (
        <div>
            <div style={hiddenStyle}>
                <Button variant='outlined' onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={visibleStyle}>
                {props.children}
                <Button variant='outlined' onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    );
};

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
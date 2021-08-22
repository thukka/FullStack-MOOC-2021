import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toolbar, IconButton, Button } from '@material-ui/core';

const TopNav = () => {
    const user = useSelector(state => state.user);

    const logOut = () => {
        window.localStorage.clear();
        window.location.reload();
    };

    const style = {
        backgroundColor: 'lightgrey',
        padding: 5,
    };

    return (
        <Toolbar style={style}>
            <IconButton edge="start" color="inherit" aria-label="menu" />
            <Button color='inherit' component={Link} to='/blogs'>
                blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
                users
            </Button>
            {user.name} logged in
            <Button color='inherit' onClick={logOut}>
                logout
            </Button>
        </Toolbar>
    );
};

export default TopNav;
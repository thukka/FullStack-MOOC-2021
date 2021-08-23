import React, { useState, useEffect } from 'react';
import userService from '../services/login';
import { Link, useParams } from 'react-router-dom';
import { TableContainer, Paper, TableBody, Table, TableRow, TableHead, TableCell } from '@material-ui/core';

const UserInfo = ({ user }) => {
    return (
        <>
            <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell><TableCell>{user.blogs.length}</TableCell>
        </>
    );
};

export const SingleUserView = ({ blogs }) => {
    const id = useParams().id;
    const usersBlogs = blogs.filter(b => b.user.id === id);

    if (usersBlogs === null) {
        return null;
    }

    return (
        <div>
            <ul>
                {usersBlogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    );
};

const Users = () => {
    const [users, setUsers] = useState(null);

    useEffect(async () => {
        let userdata = await userService.getUsers();
        setUsers(userdata);
    }, []);

    if (users === null) {
        return null;
    }

    return (
        <div>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell>blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
                            <TableRow key={user.name}>
                                <UserInfo key={user.name} user={user} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Users;
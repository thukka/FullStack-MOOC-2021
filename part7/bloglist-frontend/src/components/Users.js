import React, { useState, useEffect } from 'react';
import userService from '../services/login';

const UserInfo = ({ user }) => {
    return (
        <tr>
            <td>{user.name}</td><td>{user.blogs.length}</td>
        </tr>
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
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user => {
                        return <UserInfo key={user.id} user={user} />;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
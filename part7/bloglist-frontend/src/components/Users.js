import React, { useState, useEffect } from 'react';
import userService from '../services/login';
import { Link, useParams } from 'react-router-dom';

const UserInfo = ({ user }) => {
    return (
        <tr>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
        </tr>
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
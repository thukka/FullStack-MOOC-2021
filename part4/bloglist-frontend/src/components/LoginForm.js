import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ username, setUsername, password, setPassword, setUser }) => {
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password })
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('exception:', exception)
        }
    }

    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username:
                    <input type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password:
                    <input type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm
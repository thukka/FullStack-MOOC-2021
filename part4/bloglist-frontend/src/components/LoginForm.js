import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ username, setUsername, password, setPassword, setUser, setMessage, setIsError }) => {

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setIsError(true)
            setMessage('Wrong username or password')
            setTimeout(() => {
                setMessage(null)
                setIsError(false)
            }, 5000)
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
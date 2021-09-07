import { useEffect, useState } from "react"
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginUser, result] = useMutation(LOGIN)

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data]) //eslint-disable-line

    const login = async (event) => {
        event.preventDefault()
        await loginUser({ variables: { username, password } })
        props.setPage('authors')
    }

    if (!props.show) {
        return null;
    }

    return (
        <div style={{ marginTop: 10 }}>
            <form onSubmit={login}>
                <div>
                    username: <input value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password: <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>

    )
}

export default LoginForm
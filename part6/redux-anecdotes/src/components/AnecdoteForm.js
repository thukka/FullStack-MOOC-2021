import React from 'react'
import { connect } from 'react-redux'
import { newAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.newAnecdoteAction(content)
        props.setNotification('you created a new anecdote', 5)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

const ConnectedAnecdoteForm = connect(null, { newAnecdoteAction, setNotification })(AnecdoteForm)
export default ConnectedAnecdoteForm
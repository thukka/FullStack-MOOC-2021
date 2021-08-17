import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(newAnecdoteAction(content))
        dispatch(setNotification('you created a new anecdote', 5))
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

export default AnecdoteForm
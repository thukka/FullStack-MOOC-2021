import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        const newAnecdote = await anecdoteService.newAnecdote(content)
        dispatch(newAnecdoteAction(newAnecdote))
        dispatch(setNotification('you created a new anecdote'))
        setTimeout(() => dispatch(resetNotification()), 5000)
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
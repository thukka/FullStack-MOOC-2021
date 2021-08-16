import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter !== '') {
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        }
        return anecdotes
    })
    const dispatch = useDispatch()

    const vote = ({ id, content }) => {
        console.log('voting: ', id)
        dispatch(voteAnecdoteAction(id))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList
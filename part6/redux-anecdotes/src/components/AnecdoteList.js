import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter !== '') {
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        }
        return anecdotes
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('voting: ', anecdote.id)
        dispatch(voteAnecdoteAction(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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
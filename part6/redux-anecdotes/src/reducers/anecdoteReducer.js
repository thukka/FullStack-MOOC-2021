import anecdoteService from '../services/anecdotes'

const sortAnecdotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'VOTE':
      state = state.map(o => o.id !== action.data.id ? o : action.data)
      return sortAnecdotes(state);

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return sortAnecdotes(action.data)

    default: return state
  }
}

// action creators

export const voteAnecdoteAction = anecdote => {
  return async dispatch => {
    const increasedVotes = { ...anecdote, votes: anecdote.votes + 1 }
    const voteAnecdote = await anecdoteService.voteAnecdote(increasedVotes)
    dispatch({
      type: 'VOTE',
      data: voteAnecdote
    })
  }
}

export const newAnecdoteAction = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.newAnecdote(content)
    console.log('new Anec on: ', newAnec)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnec
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer
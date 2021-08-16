const sortAnecdotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'VOTE':
      const objectToChange = state.find(n => n.id === action.data.id)
      const changedObject = {
        ...objectToChange,
        votes: objectToChange.votes + 1
      }
      state = state.map(o => o.id !== action.data.id ? o : changedObject)
      return sortAnecdotes(state);

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default: return state
  }
}

// action creators

export const voteAnecdoteAction = id => {
  return (
    {
      type: 'VOTE',
      data: {
        id: id
      }
    }
  )
}

export const newAnecdoteAction = data => {
  return (
    {
      type: 'NEW_ANECDOTE',
      data
    }
  )
}

export const initAnecdotes = data => {
  return ({
    type: 'INIT_ANECDOTES',
    data
  })
}

export default reducer
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
      let formNewAnecdote = {
        content: action.data.content,
        id: getId(),
        votes: 0
      }
      return [...state, formNewAnecdote]

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

export const newAnecdoteAction = content => {
  return (
    {
      type: 'NEW_ANECDOTE',
      data: {
        content: content
      }
    }
  )
}

export default reducer
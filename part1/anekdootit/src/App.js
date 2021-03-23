import React, { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Votes = (props) => <p>has {props.votes} votes</p>

const MostVotes = (props) => {
  const anecdotes = props.anecdotes
  const votes = props.votes
  
  let mostVoted = 0;
  let index = 0;

  for (let i = 0; i < anecdotes.length; i++) {
    if (mostVoted < votes[i]) {
      mostVoted = votes[i]
      index = i
    } 
  }

  return (
    <>
    <h3>Anecdote with most votes</h3>
    <p> {anecdotes[index]} <br />
    has {mostVoted} votes
    </p>
    </>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const random = Math.floor(Math.random() * anecdotes.length)
  const points = [0, 0, 0, 0, 0, 0]
  const copy = [...points]

  const [selected, setSelected] = useState(random)
  const [votes, setVotes] = useState([...copy])

  function editNode(selected) {
    const copy = [...votes]
    copy[selected] = copy[selected] + 1
    setVotes(copy)
  }


  return (
    <div>
      <h3> Anecdote of the day </h3>
      {anecdotes[selected]}
      <Votes votes={votes[selected]} />
      <Button handleClick={() => editNode(selected)} text='vote' />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote' />
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App;
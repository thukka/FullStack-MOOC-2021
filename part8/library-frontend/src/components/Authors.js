import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [name, setName] = useState(props.authors[0].name)
  const [year, setYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, year: parseInt(year) } })
    setName('')
    setYear('')
  }

  if (!props.show) {
    return null
  }
  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>set birthyear</h2>
        <form onSubmit={submit}>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map(author => {
              return <option key={author.id} value={author.name}>{author.name}</option>
            })}
          </select>


          <div>
            birthyear:
        <input value={year} onChange={({ target }) => setYear(target.value)} />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
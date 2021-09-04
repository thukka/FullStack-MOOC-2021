import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [name, setName] = useState('')
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
        <div>
          name:
        <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          birthyear:
        <input value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button onClick={submit}>update author</button>
      </div>
    </div>
  )
}

export default Authors
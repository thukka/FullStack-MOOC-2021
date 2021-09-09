import React, { useState } from 'react'

const Books = (props) => {
  let books = props.books
  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }

  let genres = []
  
  props.books.forEach(book => {
    book.genres.forEach(g => {
      if (!genres.includes(g)) {
        genres = genres.concat(g)
      }
    })
  })

  if (filter) {
    books = books.filter(book => book.genres.includes(filter))
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g =>
          <button key={g} onClick={() => setFilter(g)}>{g}</button>
        )}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
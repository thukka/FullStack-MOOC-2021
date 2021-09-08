import React, { useState } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState(props.books)

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

  const filterBooks = (filter) => {
    if (filter === '') {
      setBooks(props.books)
    } else {
      let filteredList = props.books.filter(book => book.genres.includes(filter))
      setBooks(filteredList)
    }
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
          <button key={g} onClick={() => filterBooks(g)}>{g}</button>
        )}
        <button onClick={() => filterBooks('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
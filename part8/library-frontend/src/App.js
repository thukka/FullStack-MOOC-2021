import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'

import { ALL_AUTHORS, ALL_BOOKS, USER_INFO, BOOK_ADDED } from './queries'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(USER_INFO, { pollInterval: 1000 })
  const client = useApolloClient()

  useEffect(() => {
    let storageToken = localStorage.getItem('library-user-token')
    if (storageToken) {
      setToken(storageToken)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`new book added! ${subscriptionData.data.bookAdded.title}`)
    }
  })

  if (authors.loading || books.loading || !user.data) {
    return (
      <div>loading...</div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => setPage('recommended')}>recommended</button> : null}
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended
        show={page === 'recommended'}
        books={books.data.allBooks}
        user={user}
      />


    </div>
  )
}

export default App
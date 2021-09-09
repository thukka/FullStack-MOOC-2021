import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommended = (props) => {

    const books = useQuery(ALL_BOOKS)
    const user = props.user
    if (books.loading || user.loading) {
        return <div>loading...</div>
    }

    if (!props.show || !user.data.me) {
        return null
    }

    let filtered = books.data.allBooks.filter(book => book.genres.includes(user.data.me.favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>
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
                        {filtered.map(a =>
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Recommended
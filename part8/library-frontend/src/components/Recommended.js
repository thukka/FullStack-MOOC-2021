import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommended = (props) => {

    const [userBooks, result] = useLazyQuery(ALL_BOOKS)
    const [books, setBooks] = useState(props.books)
    const user = props.user

    useEffect(() => {
        userBooks({ variables: { genre: user.favoriteGenre } })
        if (result.data) {
            console.log('result data: ', result.data)
            setBooks(result.data.allBooks)
        }
    }, [result.data]) //eslint-disable-line

    if (!props.show || !user) {
        return null
    }
    console.log('user!: ', user)
    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
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
            </div>
        </div>
    )
}

export default Recommended
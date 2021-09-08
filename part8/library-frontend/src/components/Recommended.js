import React from 'react'
import { useQuery } from '@apollo/client'
import { USER_INFO } from '../queries'

const Recommended = (props) => {

    const userInfo = useQuery(USER_INFO)
    const books = props.books.filter(book => book.genres.includes(userInfo.data.me.favoriteGenre))

    if (!props.show) {
        return null
    }

    console.log('user info: ', userInfo.data.me.favoriteGenre)

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <strong>{userInfo.data.me.favoriteGenre}</strong></p>
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
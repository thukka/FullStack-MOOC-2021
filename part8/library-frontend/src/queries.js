import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors{
        name
        bookCount
        born
        id
    }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String){
    allBooks(genre: $genre) {
        title
        published
        author {
            name
            born
        }
        id
        genres
    }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres,
    ) {
        title
        author {
            name
            born
        }
        published
        genres
        id
    }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $year: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $year
    ) {
        name
        born
    }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(
        username: $username,
        password: $password
    ) {
        value
    }
}
`

export const USER_INFO = gql`
query me {
    me {
        username
        favoriteGenre
    }
}
`
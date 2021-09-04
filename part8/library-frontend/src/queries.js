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
query {
    allBooks {
        title
        published
        author
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
        author
        published
        genres
        id
    }
}
`
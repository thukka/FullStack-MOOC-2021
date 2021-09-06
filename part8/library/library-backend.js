require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log('error: ', error.message))


const typeDefs = gql`
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

type Author {
  name: String!
  born: Int
  bookCount: Int
  id: ID!
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
}

type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    authorBorn: Int!
    genres: [String!]!
  ): Book
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.hasOwnProperty('genre')) {
        return await Book.find( { genres: { $in: [ args.genre ] } } )
      }
      return Book.find({});
    },
    allAuthors: () => Author.find({})
  },
  Book: {
    author: async (root) => {
      let author = await Author.findOne({ _id: root.author })
      return {
        name: author.name,
        born: author.born,
      }
    }
  },
  Author: {
    bookCount: async (root) => {
      let books = await Book.find({ author: root._id }).countDocuments()
      return books
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      // if author doesnt exist save to db
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = { name: args.author, born: args.authorBorn }
        let authorSaved = new Author(author)
        try {
          await authorSaved.save()
          author = authorSaved
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      // save book to db
      const book = { ...args, author: author }
      const savedBook = new Book(book)
      try {
        await savedBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args})
      }
      return savedBook
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOneAndUpdate({ name: args.name }, { $set: { born: args.setBornTo } })
      return author ? author : null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

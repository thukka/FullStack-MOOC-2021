require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log('error: ', error.message))

const JWT_SECRET = process.env.JWT_SECRET

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

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  ): Book
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.hasOwnProperty('genre')) {
        return await Book.find({ genres: { $in: [args.genre] } })
      }
      return Book.find({});
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
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
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError('not authenticated! please log in')
      }

      // if author doesnt exist save to db
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = { name: args.author, born: 0 }
        let authorSaved = new Author(author)
        try {
          await authorSaved.save()
          author = authorSaved
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      console.log('currentUser:', currentUser)
      console.log('author: ', author)
      // save book to db
      const book = { ...args, author: author }
      console.log('book: ', book)
      const savedBook = new Book(book)
      try {
        await savedBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return savedBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated! please log in')
      }
      let author = await Author.findOneAndUpdate({ name: args.name }, { $set: { born: args.setBornTo } })
      return author ? author : null
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return await user.save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

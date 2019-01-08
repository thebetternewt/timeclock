/* eslint-disable no-console */

require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')

const { typeDefs, resolvers } = require('./schema')
const { User } = require('./models')

const app = express()

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const playground = {
      settings: {
        'editor.cursorShape': 'block',
      },
    }

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground,
      context: async ({ req }) => {
        // get the user token from the headers
        const authorization = req.headers.authorization || ''
        const bearerLength = 'Bearer '.length
        const token = authorization.slice(bearerLength) || ''

        // try to retrieve a user with the token
        const user = await getUser(token)

        // add the user to the context
        return { user }
      },
    })

    server.applyMiddleware({ app })

    const port = process.env.PORT || 4000

    app.listen(port, () => {
      console.log(`🚀  Server ready at localhost:${port}${server.graphqlPath}`)
    })
  })
  .catch(console.error)

const getUser = async token => {
  if (!token) {
    return null
  }

  const { ok, result } = await new Promise(resolve =>
    jwt.verify(token, process.env.JWT_SECRET, (err, jwtResult) => {
      if (err) {
        resolve({
          ok: false,
          result: err,
        })
      } else {
        resolve({
          ok: true,
          result: jwtResult,
        })
      }
    })
  )

  if (ok) {
    const user = await User.findOne({ _id: result.id })
    return user
  }
  return null
}

const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./schema');

const { User } = require('./models');

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    const playground = {
      settings: {
        'editor.cursorShape': 'block'
      }
    };

    return new ApolloServer({
      typeDefs,
      resolvers,
      playground,
      context: async ({ req }) => {
        // get the user token from the headers
        const authorization = req.headers.authorization || '';
        const bearerLength = 'Bearer '.length;
        const token = authorization.slice(bearerLength) || '';

        // try to retrieve a user with the token
        const user = await getUser(token);

        // add the user to the context
        return { user };
      }
    }).listen();
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch(console.error);

const getUser = async token => {
  if (!token) {
    return null;
  }

  const { ok, result } = await new Promise(resolve =>
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        resolve({
          ok: false,
          result: err
        });
      } else {
        resolve({
          ok: true,
          result
        });
      }
    })
  );

  if (ok) {
    const user = await User.findOne({ _id: result.id });
    // console.log(`[ok] user:`, user);
    return user;
  } else {
    // console.error(`[Error]:`, result);
    return null;
  }
};

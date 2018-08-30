const { gql } = require('apollo-server');
const base = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = [
  base,
  require('./user'),
  require('./department'),
  require('./punch')
];

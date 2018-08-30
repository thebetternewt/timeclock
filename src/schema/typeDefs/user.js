const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    netId: String!
    idNumber: String!
    password: String!
    firstName: String!
    lastName: String!
    admin: Boolean
    departments: [Department!]!
    punches: [Punch!]!
  }
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }
  extend type Mutation {
    addUser(
      netId: String!
      idNumber: String!
      password: String!
      firstName: String!
      lastName: String!
    ): User!
    login(netId: String!, password: String!): String!
    updateUser(
      id: ID!
      netId: String
      idNumber: String
      password: String
      firstName: String
      lastName: String
      departments: String
      admin: Boolean
    ): User!
    removeUser(id: ID!): String
  }
`;

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
    active: Boolean!
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
      admin: Boolean
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
      active: Boolean
    ): User!
    removeUser(id: ID!): String
    deactivateUser(id: ID!): String
    activateUser(id: ID!): String
  }
`;

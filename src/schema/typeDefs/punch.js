const { gql } = require('apollo-server');

module.exports = gql`
  type Punch {
    id: ID!
    userId: ID!
    departmentId: ID!
    clockInMsTime: String!
    clockOutMsTime: String
  }

  extend type Query {
    punch(id: ID!): Punch
    punches(
      userId: ID
      netId: ID
      departmentId: ID
      beginMsTime: String
      endMsTime: String
    ): [Punch!]!
  }

  extend type Mutation {
    clockIn(departmentId: ID!): Punch!
    clockOut: Punch!
    addPunch(
      userId: ID!
      departmentId: ID!
      clockInMsTime: String!
      clockOutMsTime: String
    ): Punch!
    updatePunch(
      id: ID!
      userId: ID
      clockInMsTime: String
      clockOutMsTime: String
    ): Punch!
  }
`;

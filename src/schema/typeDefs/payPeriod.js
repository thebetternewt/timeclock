const { gql } = require('apollo-server')

module.exports = gql`
  type PayPeriod {
    id: ID!
    startDate: String!
    endDate: String!
    payPeriodId: ID!
    fiscalYear: Int!
    punches(userId: String): [Punch!]!
  }

  extend type Query {
    payPeriod(
      id: ID
      payPeriodId: ID
      fiscalYear: Int
      userId: ID
      departmentId: ID
    ): PayPeriod
    payPeriods(fiscalYear: Int, userId: ID, departmentId: ID): [PayPeriod!]!
  }
  extend type Mutation {
    addPayPeriod(
      startDate: String!
      endDate: String!
      payPeriodId: ID!
      fiscalYear: Int!
    ): PayPeriod!
    updatePayPeriod(
      id: ID!
      startDate: String
      endDate: String
      payPeriodId: ID
      fiscalYear: Int
    ): PayPeriod!
    removePayPeriod(id: ID!): String!
  }
`

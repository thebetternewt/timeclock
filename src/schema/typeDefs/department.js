const { gql } = require('apollo-server')

module.exports = gql`
  type Department {
    id: ID!
    name: String!
    representativeId: ID
  }
  extend type Query {
    department(id: ID!): Department
    departments: [Department!]!
  }
  extend type Mutation {
    addDepartment(name: String!, representativeId: ID): Department!
    updateDepartment(id: ID!, name: String, representativeId: ID): Department!
    removeDepartment(id: ID!): String
  }
`

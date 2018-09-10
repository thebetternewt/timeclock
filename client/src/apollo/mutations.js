import gql from 'graphql-tag';

const LOGIN = gql`
  mutation login($netId: String!, $password: String!) {
    login(netId: $netId, password: $password)
  }
`;

const CLOCK_IN = gql`
  mutation ClockInMutation($departmentId: ID!) {
    clockIn(departmentId: $departmentId) {
      id
      departmentId
      userId
      clockInMsTime
      clockOutMsTime
    }
  }
`;

const CLOCK_OUT = gql`
  mutation ClockOutMutation {
    clockOut {
      id
      departmentId
      userId
      clockInMsTime
      clockOutMsTime
      department {
        name
        id
      }
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser(
    $netId: String!
    $idNumber: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    addUser(
      netId: $netId
      idNumber: $idNumber
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $netId: String!
    $idNumber: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    updateUser(
      id: $id
      netId: $netId
      idNumber: $idNumber
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      id
    }
  }
`;

export { LOGIN, CLOCK_IN, CLOCK_OUT, ADD_USER, UPDATE_USER };

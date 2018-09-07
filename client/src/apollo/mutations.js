import gql from 'graphql-tag';

const CLOCK_IN_MUTATION = gql`
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

const CLOCK_OUT_MUTATION = gql`
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

const ADD_USER_MUTATION = gql`
  mutation AddUserMutation(
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

export { CLOCK_IN_MUTATION, CLOCK_OUT_MUTATION, ADD_USER_MUTATION };

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
      department {
        name
        id
      }
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
    $admin: Boolean
  ) {
    addUser(
      netId: $netId
      idNumber: $idNumber
      password: $password
      firstName: $firstName
      lastName: $lastName
      admin: $admin
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
    $firstName: String!
    $lastName: String!
    $password: String
    $admin: Boolean
  ) {
    updateUser(
      id: $id
      netId: $netId
      idNumber: $idNumber
      password: $password
      firstName: $firstName
      lastName: $lastName
      admin: $admin
    ) {
      id
    }
  }
`;

// Punches
const ADD_PUNCH = gql`
  mutation AddPunch(
    $userId: ID!
    $departmentId: ID!
    $clockInMsTime: String!
    $clockOutMsTime: String!
  ) {
    addPunch(
      userId: $userId
      departmentId: $departmentId
      clockInMsTime: $clockInMsTime
      clockOutMsTime: $clockOutMsTime
    ) {
      id
      userId
      departmentId
      clockInMsTime
      clockOutMsTime
      department {
        name
        id
      }
    }
  }
`;

const UPDATE_PUNCH = gql`
  mutation UpdatePunch(
    $id: ID!
    $departmentId: ID!
    $clockInMsTime: String!
    $clockOutMsTime: String!
  ) {
    updatePunch(
      id: $id
      departmentId: $departmentId
      clockInMsTime: $clockInMsTime
      clockOutMsTime: $clockOutMsTime
    ) {
      id
      userId
      departmentId
      clockInMsTime
      clockOutMsTime
      department {
        name
        id
      }
    }
  }
`;

// Departments
const ADD_DEPARTMENT = gql`
  mutation AddDepartment($name: String!, $representativeId: ID!) {
    addDepartment(name: $name, representativeId: $representativeId) {
      id
      name
      representativeId
    }
  }
`;

const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $name: String!, $representativeId: ID!) {
    updateDepartment(
      id: $id
      name: $name
      representativeId: $representativeId
    ) {
      id
      name
      representativeId
    }
  }
`;

export {
  LOGIN,
  CLOCK_IN,
  CLOCK_OUT,
  ADD_USER,
  UPDATE_USER,
  ADD_PUNCH,
  UPDATE_PUNCH,
  ADD_DEPARTMENT,
  UPDATE_DEPARTMENT
};

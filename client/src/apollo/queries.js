import gql from 'graphql-tag';

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
  }
`;

// Users
const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      netId
      admin
      firstName
      lastName
      departments {
        id
        name
      }
    }
  }
`;

const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      netId
      idNumber
      admin
      firstName
      lastName
      departments {
        id
        name
      }
    }
  }
`;

// Punches
const LAST_PUNCH_QUERY = gql`
  query LastPunchQuery {
    lastPunch {
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
const DEPARTMENTS_QUERY = gql`
  query DepartmentsQuery {
    departments {
      id
      name
      representativeId
    }
  }
`;

export {
  CURRENT_USER_QUERY,
  USERS_QUERY,
  AUTH_QUERY,
  LAST_PUNCH_QUERY,
  DEPARTMENTS_QUERY
};

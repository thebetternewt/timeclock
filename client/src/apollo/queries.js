import gql from 'graphql-tag';

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

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
  }
`;

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

export { CURRENT_USER_QUERY, USERS_QUERY, AUTH_QUERY, LAST_PUNCH_QUERY };

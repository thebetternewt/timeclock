import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query current_user {
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

export { CURRENT_USER_QUERY, AUTH_QUERY, LAST_PUNCH_QUERY };

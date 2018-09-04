import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query current_user {
    me {
      id
      netId
      admin
      firstName
      lastName
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
      departmentId
      userId
      clockInMsTime
      clockOutMsTime
    }
  }
`;

export { CURRENT_USER_QUERY, AUTH_QUERY, LAST_PUNCH_QUERY };

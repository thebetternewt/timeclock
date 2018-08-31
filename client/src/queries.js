import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query current_user {
    user {
      id
      netId
      admin
    }
  }
`;

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
  }
`;

export { CURRENT_USER_QUERY, AUTH_QUERY };

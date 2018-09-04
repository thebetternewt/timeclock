import ApolloClient from 'apollo-boost';
import { AUTH_QUERY } from './queries';

const defaultState = {
  isAuthenticated: false,
  user: null
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults: defaultState
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
});

const setAuthenticatedUser = userData => {
  client.cache.writeData({
    data: {
      isAuthenticated: true,
      user: { __typename: 'user', ...userData }
    }
  });

  // const { user } = client.cache.readQuery({ query: CURRENT_USER_QUERY });
  // console.log('user from cache:', user);
};

const isAuthenticated = () => {
  const { isAuthenticated } = client.readQuery({
    query: AUTH_QUERY
  });
  return isAuthenticated;
};

const logOutUser = async () => {
  localStorage.removeItem('token');
  await client.resetStore();
};

export default client;
export { isAuthenticated, setAuthenticatedUser, logOutUser };

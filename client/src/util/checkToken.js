import jwtDecode from 'jwt-decode';
import { setAuthenticatedUser, logOutUser } from '../apollo/client';

export default () => {
  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwtDecode(token);
    // Set user data in Apollo cache
    setAuthenticatedUser(decoded);

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      logOutUser();
      // Redirect to login
      window.location.href = '/';
    }
  }
};

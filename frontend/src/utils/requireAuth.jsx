import { Navigate } from 'react-router-dom';

const requireAuth = (element, isAuthenticated) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default requireAuth;

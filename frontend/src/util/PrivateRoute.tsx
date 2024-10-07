import { Navigate, Outlet } from 'react-router-dom';
import { PAGE_URL } from './Constants';

const PrivateRoute = () => {
  const isAuthenticated =
    localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== undefined;

  return isAuthenticated ? <Outlet /> : <Navigate to={`${PAGE_URL.MY_PAGE}`} replace />;
};

export default PrivateRoute;

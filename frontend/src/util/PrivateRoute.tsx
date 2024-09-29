import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PAGE_URL } from './Constants';

const PrivateRoute = () => {
  const isAuthenticated =
    localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== undefined;

  return isAuthenticated ? <Outlet /> : <Navigate to={`${PAGE_URL.LOG_IN}`} replace />;
};

export default PrivateRoute;

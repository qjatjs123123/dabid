import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PrivateRoute = () => {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/about" replace />;
};

export default PrivateRoute;

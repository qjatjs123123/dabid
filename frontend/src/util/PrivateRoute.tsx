import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PAGE_URL } from './Constants';

interface PrivateRouteProps {
  setModalOpen: (isOpen: boolean) => void;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ setModalOpen }) => {
  const isAuthenticated =
    localStorage.getItem('accessToken') !== null && localStorage.getItem('accessToken') !== undefined;

  if (!isAuthenticated) {
    setModalOpen(true); // 로그인 모달 열기
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={`${PAGE_URL.HOME}`} replace />;
};

export default PrivateRoute;

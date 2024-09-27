import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from '../../api/MemberAPI';
import { PAGE_URL } from '../../util/Constants';

const Logout: React.FC = () => {
  useEffect(() => {
    logout();
  }, []);

  return <Navigate to={PAGE_URL.HOME} />;
};

export default Logout;

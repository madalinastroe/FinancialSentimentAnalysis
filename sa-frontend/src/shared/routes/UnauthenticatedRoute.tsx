import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const UnauthenticatedRoute = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
      return <Navigate to='/' replace />;
  }

  return <Outlet />;

}

export default UnauthenticatedRoute;

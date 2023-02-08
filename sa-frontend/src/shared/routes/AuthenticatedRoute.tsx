import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


const AuthenticatedRoute = () => {
    const { isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn) {        
        return <Navigate to='/login' replace />;
    }

    return <Outlet />;
}
export default AuthenticatedRoute;

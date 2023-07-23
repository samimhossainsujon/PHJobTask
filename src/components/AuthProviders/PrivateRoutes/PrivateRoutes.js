import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const PrivateRoutes = ({children}) => {

    const { User, Loading } = useContext(AuthContext);
    const location = useLocation();    

    if (Loading) {
        return <progress className="progress w-56"></progress>;
    }

    if (User) {
        return children;
    }


    return <Navigate state={{ from: location }} to="/login" replace />;
};
export default PrivateRoutes;
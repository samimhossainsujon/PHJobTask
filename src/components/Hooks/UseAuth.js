import { useContext } from 'react';
import { AuthContext } from '../AuthProviders/AuthProvider/AuthProvider';

const UseAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default UseAuth;
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider/AuthProvider';

const UseAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default UseAuth;
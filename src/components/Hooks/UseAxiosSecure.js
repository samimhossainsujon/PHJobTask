import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const UseAxiosSecure = () => {
    const { Logout } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await Logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [Logout, navigate]);

    return [axiosSecure];
};

export default UseAxiosSecure;
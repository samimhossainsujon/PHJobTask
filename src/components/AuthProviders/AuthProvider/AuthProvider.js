import React, { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../Firebase/firebase.config';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';




export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [User, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);



    //==================================
    //creating user user email and password
    //==================================

    const CreateNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };


    const NewUserProfileUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }


    //==================================
    //User login by Google account
    //==================================

    const GoogleProvider = new GoogleAuthProvider();

    const UserGoogleLogin = () => {
        setLoading(true);
        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                const LoggedGoogleUser = result.user;
                const sendUserData = { name: LoggedGoogleUser.displayName, email: LoggedGoogleUser.email };

                fetch('https://assignment-12-server-tawny.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sendUserData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.insertedId) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Registered successfully',
                            });
                            Navigate('/');
                        }
                    })
                    .catch((error) => {
                        // Handle fetch error
                        console.error(error);
                    });
            })
            .catch((error) => {
                // Handle sign in error
                console.error(error);
            });
    };



    //================================
    // git hub login
    //================================
    const githubProvider = new GithubAuthProvider();
    const SignInGithub = () => {
        setLoading(true);
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const loggedGithubUser = result.user;
                setUser(loggedGithubUser);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    //==================================
    // user email and password login function
    //==================================

    const UserLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };





    //===============================
    //User LogOut Account
    //===============================

    const UserLogOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    //==============================
    // user on state change function
    //================================


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, CurrentUser => {
            setUser(CurrentUser);
            if (CurrentUser) {
                axios.post('https://assignment-12-server-tawny.vercel.app/jwt', { email: CurrentUser.email })
                    .then(data => {
                        localStorage.setItem('access-token', data.data.token);
                        setLoading(false);
                    })
            }
            else {
                localStorage.removeItem('access-token');
            }

        });
        return () => unsubscribe();
    }, []);




    const AuthInfo = {
        CreateNewUser,
        UserLogin,
        UserGoogleLogin,
        Loading,
        User,
        UserLogOut,
        SignInGithub,
        NewUserProfileUpdate
    };

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

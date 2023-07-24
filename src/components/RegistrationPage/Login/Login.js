import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa';
import { AuthContext } from '../../AuthProviders/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { AiFillGithub, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';





const Login = () => {

    const { UserLogin, UserGoogleLogin, SignInGithub } = useContext(AuthContext);
    const [error, setError] = useState();
    const Navigate = useNavigate();
    const Location = useLocation();
    const [Success, setSuccess] = useState();
    const from = Location.state?.from?.pathname || "/";


    //=============================
    //google sing in github
    //=============================
    const handleGithubSignIn = () => {
        SignInGithub();
        Navigate(from, { replace: true });
    };


    //=================================
    // google icon click and login
    //=================================


    const UserHandleGoogleLogin = () => {
        UserGoogleLogin();
        Navigate(from, { replace: true });
        console.log(UserGoogleLogin);
    };



    //=====================================
    // email and password types for login
    //======================================


    const HandleUserLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        // console.log(email, password);


        UserLogin(email, password)
            .then((result) => {
                const loggedUser = result.user;
                setSuccess(Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Login successful",

                }));
                Navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(Swal.fire({
                    icon: "error",
                    title: error,
                    text: "Please try again",
                }));
            });
    };



    return (

        <>
            <Helmet>
                <title>Login || PH JOB TASK</title>               
            </Helmet>


            <div>


                <form onSubmit={HandleUserLogin}>
                    <div className="hero min-h-screen bg-base-200">
                        <div className="hero-content flex-col">
                            <div className="text-center">
                                <h1 className="text-5xl font-bold mb-5">Login now!</h1>
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                                <div className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="email"
                                            className="input input-bordered"
                                            name="email"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="password"
                                            className="input input-bordered"
                                            name="password"
                                            required
                                        />
                                    </div>

                                    <label className="label">
                                        <Link to="#" className="label-text-alt link link-hover">
                                            Forgot password?
                                        </Link>
                                    </label>

                                    <div className="form-control mt-6 mb-5">
                                        <button type="submit" className="btn btn-outline btn-secondary">
                                            Log in
                                        </button>
                                    </div>

                                    <div className="flex items-center mx-auto text-center text-5xl gap-5">

                                        <button
                                            onClick={UserHandleGoogleLogin}
                                            className="btn btn-circle btn-lg  btn-outline btn-secondary"
                                        > <FcGoogle />  </button>


                                        <button
                                            onClick={handleGithubSignIn}
                                            className="btn btn-circle btn-lg  btn-outline btn-secondary"
                                        > <AiFillGithub />  </button>
                                    </div>

                                    <Link to="/signup"
                                        className=" mt-5  mx-auto label-text-alt link link-hover text-blue-500 text-lg"
                                    >New member? Register here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>


    );
};

export default Login;
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProviders/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';

const SignUp = () => {
    const { CreateNewUser, NewUserProfileUpdate } = useContext(AuthContext);
    const [error, setError] = useState();
    const [Success, setSuccess] = useState();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState({ email: '', password: '' });
   
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);


        if (data.password === data.confirmPassword) {
            CreateNewUser(data.email, data.password)
                .then((result) => {
                    const createdUser = result.user;
                    console.log(createdUser);

                    NewUserProfileUpdate(data.name, data.photoURL)
                        .then(() => {
                            const sendUserData = { name: data.name, email: data.email };

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
                                        reset();
                                        setSuccess(
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Success',
                                                text: 'Registered successfully',
                                            })
                                        );
                                        navigate('/');
                                    }
                                })




                        })




                })
                .catch((error) => {
                    setError(Swal.fire({
                        icon: "error",
                        title: error,
                        text: "Please try again",
                    }));

                });
        } else {
            // Passwords do not match, handle the error
            alert("Passwords do not match, handle the error");
        }
    };


    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    return (
        <>
            <Helmet>
                <title>SignUp || Dance School </title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="hero min-h-screen bg-base-200 mt-5">
                        <div className="hero-content flex-col">
                            <div className="text-center">
                                <h1 className="text-5xl font-bold mb-10">Register Now</h1>
                            </div>
                            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                                <div className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="name"
                                            placeholder="Enter your name"
                                            className="input input-bordered"
                                            name="name"
                                            {...register('name', { required: true })}
                                        />
                                        {errors.name && <span className="text-red-500">Name is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo Url</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your Photo Url here"
                                            name="photoURL"
                                            className="input input-bordered"
                                            {...register('photoURL', { required: true })}
                                        />
                                        {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="email"
                                            className="input input-bordered"
                                            name="email"
                                            onChange={event => setData({ ...data, email: event.target.value })}
                                            {...register('email', { required: true })}
                                        />
                                        {errors.email && <span className="text-red-500">Email is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            onChange={handlePasswordChange}
                                            placeholder="Password"
                                            className="input input-bordered"
                                            name="password"
                                            {...register('password', {
                                                required: true,
                                                minLength: 6,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                            })}
                                        />
                                        {errors.password && <span className="text-red-500">Password is required</span>}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="input input-bordered"
                                            onChange={event => setConfirmPassword(event.target.value)}
                                            name="confirmPassword"
                                            {...register('confirmPassword', {
                                                required: true,
                                                required: true,
                                                minLength: 6,
                                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                            })}
                                        />
                                        {errors.confirmPassword && <span className="text-red-500">Confirm Password is required</span>}
                                    </div>

                                    <div className="form-control mt-6 mb-5">
                                        <button type="submit" className="btn btn-outline btn-secondary">
                                            Sign Up
                                        </button>
                                    </div>

                                    <Link
                                        to="/login"
                                        className="mt-3 mx-auto label-text-alt link link-hover text-blue-500 text-lg"
                                    >
                                        Already a member? Login here.
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;

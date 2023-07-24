import React from 'react';
import animationData from '../../assets/98642-error-404.json';
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';





const ErrorPage = () => {



    return (

        <>

            <Helmet>
                <title>404 || PH JOB TASK </title>
              
            </Helmet>
            
            <div>

                <p className='text-center mt-1 text-red-700 text-6xl font-extrabold'>PAGE NOT FOUND</p>
                <div className='w-1/2 mx-auto' >
                    <Lottie animationData={animationData}> </Lottie>

                    <div className='flex items-center justify-center'>
                        <Link to='/'>
                            <button className="btn btn-outline btn-secondary">Go to Home</button>
                        </Link>
                    </div>



                </div>
            </div>
        </>
    );
};

export default ErrorPage;
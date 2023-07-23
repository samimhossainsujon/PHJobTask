import React from 'react';
import Colleges from '../Colleges/Colleges';
import CollegeImage from '../CollegeImage/CollegeImage';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <>
                <div className='mt-10'>
                    <h1 className=' text-center font-bold text-2xl'>Colleges Name</h1>
                </div>

                <div className='gap-5 grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src="https://i.ibb.co/bPQQgCh/data.jpg" alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>


                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src="https://i.ibb.co/bPQQgCh/data.jpg" alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>


                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src="https://i.ibb.co/bPQQgCh/data.jpg" alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-10 flex  justify-center items-center'>
                    <Link to='/Colleges'>
                        <button className="btn btn-outline btn-secondary uppercase">See All college</button>
                    </Link>
                </div>
            </>
            <CollegeImage />
        </div>
    );
};

export default Home;
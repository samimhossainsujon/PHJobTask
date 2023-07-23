import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                            Open drawer
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                            <div>
                                <h1 className='text-center text-2xl font-bold underline mt-5 mb-5'>Admin Dashboard</h1>
                            </div>

                            <li className='mb-2 font-bold text-lg'><Link to='/Dashboard/AddColleges'>Add Colleges</Link></li>
                            <li className='mb-2 font-bold text-lg'><Link to='/Dashboard/AddAdmission'> Add Admission</Link></li>
                            <li className='mb-2 font-bold text-lg'><Link to='/Dashboard/AddGallery'> Add Gallery images</Link></li>
                            <div className="divider"></div>
                            <li className='mb-2 font-bold text-lg'><Link to='/Dashboard/Colleges'>Colleges</Link></li>
                            <li className='mb-2 font-bold text-lg'><Link to='/Dashboard/Admission'>Admission</Link></li>
                            <li className='mb-2 font-bold text-lg'><Link to='/Dashboard/Gallery'>Gallery</Link></li>
                            <div className="divider"></div>
                            <li className='mb-2 font-bold text-lg text-blue-500'><Link to='/'>Home</Link></li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
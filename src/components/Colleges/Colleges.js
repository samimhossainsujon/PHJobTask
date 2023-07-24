import React, { useEffect, useState } from 'react';
import { AiFillCalendar } from 'react-icons/ai';
import { BsFillCalendarEventFill } from 'react-icons/bs';
import { MdSportsScore } from 'react-icons/md';
import { FcSportsMode } from 'react-icons/fc';
import { Helmet } from 'react-helmet-async';



const Colleges = () => {

    const [collages, setCollage] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/newCollageAdd')
            .then(response => response.json())
            .then(data => {
                setCollage(data)
                console.log(data)
            })
    }, [])

    return (
        <div>

            <Helmet>
                <title>Colleges || PH JOB TASK </title>
            </Helmet>
            <>
                <div className='mt-10'>
                    <h1 className=' text-center font-bold text-2xl'>Colleges Name</h1>
                </div>

                <div className='gap-5 grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                    {collages.map((collage, index) => (
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-2 pt-2">
                                <img src={collage.CollegeImage} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body">
                                <h1 className='text-xl font-bold'>{collage.CollegeName}</h1>


                                <div className='flex items-center gap-3'>
                                    <AiFillCalendar className='text-xl'></AiFillCalendar>
                                    <h1>AdmissionDate : {collage.AdmissionDate}</h1>
                                </div>


                                <div className='flex items-center gap-3'>
                                    <BsFillCalendarEventFill className='text-xl'></BsFillCalendarEventFill>
                                    <h1>Events : {collage.Events}</h1>
                                </div>



                                <div className='flex items-center gap-3'>
                                    <MdSportsScore className='text-3xl'></MdSportsScore>
                                    <h1>ResearchHistory :{collage.ResearchHistory}</h1>
                                </div>


                                <div className='flex items-center gap-3'>
                                    <FcSportsMode className='text-3xl'></FcSportsMode>
                                    <h1>Sports :{collage.Sports}</h1>
                                </div>

                                <button className="btn btn-primary">View details</button>

                            </div>
                        </div>))}
                </div>
            </>


        </div>
    );
};

export default Colleges;
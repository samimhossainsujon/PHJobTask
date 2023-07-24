import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Admission = () => {

    const [collages, setCollage] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/newCollageAdd`)
            .then(response => response.json())
            .then(data => {
                setCollage(data)
                console.log(data)
            })
    }, [])
    return (
        <div>
            <div>
                <h1 className='text-center mt-10 mb-10 font-bold text-2xl underline underline-offset-8 '> apply a College to get Started Your study</h1>
            </div>
            <>
                <div className='gap-5 grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                    {collages.map((collage, index) => (
                        <div 
                        key={collage._id}
                        collage={collage}
                        >
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure className="px-2 pt-2">
                                    <img src={collage.CollegeImage} alt="Shoes" className="rounded-xl" />
                                </figure>
                                <div className="card-body">
                                    <h1 className='text-xl font-bold'>{collage.CollegeName}</h1>
                                    <h1 className='text-xl font-bold'>{collage.CollegeLocation}</h1>


                                    <Link to={`/AdmissionForm/${collage._id}`}>
                                        <button className="btn btn-primary">apply now</button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        </div>
    );
};

export default Admission;
import React, { useEffect, useState } from 'react';

const Feedback = () => {


    const [Feedbacks, setFeedbacks] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/feedback')
            .then((response) => response.json())
            .then((data) => {
                setFeedbacks(data);
                console.log(data);
            });
    }, []);
    return (
        <div>
            <div className='mt-10'>
                <h1 className=' text-center font-bold text-2xl'>Student FeedBack</h1>
            </div>


            {Feedbacks.map((Feedback, index) => (
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className='text-xl font-bold'>{Feedback.Feedback}</h1>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Feedback;
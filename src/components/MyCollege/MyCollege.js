import React, { useEffect, useState } from 'react';

const MyCollege = () => {

    const [collages, setCollage] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/LimitedClassAdd?limit=3`)
            .then(response => response.json())
            .then(data => {
                setCollage(data)
                // console.log(data)
            })
    }, [])

    return (
        <div>
            <div className='gap-5 grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>

                {collages.map((collage, index) => (
                    <div></div>
                ))}
            </div>

        </div>
    );
};

export default MyCollege;
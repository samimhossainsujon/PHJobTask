import React, { useEffect, useState } from 'react';

const CollegeImage = () => {

    const [CollageGallery, setCollageGallery] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/CollageGallery`)
            .then(response => response.json())
            .then(data => {
                setCollageGallery(data)
                console.log(data)
            })
    }, [])
    return (
        <div>
            <div className='mt-10'>
                <h1 className=' text-center font-bold text-2xl'>Image Gallery</h1>
            </div>
            <div className='mt-5 grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 '>

                {CollageGallery.map((Gallery) => (
                    <div class="avatar mt-5 mb-5">
                        <div class="w-44 mt rounded transition-transform transform origin-center hover:scale-125">
                            <img src={Gallery.CollegeImage} alt="" />
                        </div>
                    </div>
                ))}











            </div>
        </div>
    );
};

export default CollegeImage;
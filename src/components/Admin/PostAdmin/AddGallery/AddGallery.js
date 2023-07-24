import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const img_hosting = process.env.REACT_APP_Image_Upload_token;



const AddGallery = () => {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting}`

    const onSubmit = data => {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', data.CollegeImage[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const imgUrl = result.data.display_url;
                    const AddCollage = {
                        CollegeImage: imgUrl,
                       
                    };

                    fetch('http://localhost:5000/CollageGallery', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(AddCollage)
                    })
                        .then(response => response.json())
                        .then(data => {
                            setLoading(false);
                            if (data.insertedId) {
                                reset();
                                Swal.fire(
                                    'College added successfully',
                                    'College added and Thanks for',
                                    'success'
                                );
                            } else {
                                Swal.fire('Error', 'An error occurred while adding the college', 'error');
                            }
                        })
                        .catch(error => {
                            setLoading(false);
                            Swal.fire('Error', 'An error occurred while adding the college', 'error');
                        });
                } else {
                    setLoading(false);
                    Swal.fire('Error', 'An error occurred while uploading the image', 'error');
                }
            })
            .catch(error => {
                setLoading(false);
                Swal.fire('Error', 'An error occurred while uploading the image', 'error');
            });
    };





    return (
        <>
            <Helmet>
                <title>Add College Image||  </title>
            </Helmet>

            <div className='w-full mb-5'>
                <form data-aos="fade-up-right" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className=' text-center font-extrabold text-3xl mb-5'>ADD College Image </h1>
                    <div className="divider"></div>

                    <div className="px-24">


                        <div>
                            <label className="label">
                                <span className="text-center">College Image</span>
                            </label>
                            <input
                                type="file"
                                {...register('CollegeImage')}
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>

                        <div className='flex justify-center items-center mt-5'>
                            <button className="btn btn-outline btn-secondary" type="submit">
                                Add College
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </>

    );
};

;


export default AddGallery;
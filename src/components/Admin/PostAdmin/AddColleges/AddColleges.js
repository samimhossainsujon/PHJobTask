import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';


const img_hosting = process.env.REACT_APP_Image_Upload_token;



const AddColleges = () => {
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
                        CollegeName: data.CollegeName,
                        AdmissionDate: data.AdmissionDate,
                        Events: data.Events,
                        CollegeLocation: data.CollegeLocation,
                        ResearchHistory: data.ResearchHistory,
                        Sports: data.Sports
                    };

                    fetch('http://localhost:5000/newCollageAdd', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(AddCollage)
                    })
                        .then(response => response.json())
                        .then(data => {
                            setLoading(false);
                            if (data.insertedId) { // Fix: Use data.insertedId instead of data.data.insertedId
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
                <title>AddColleges ||  </title>
            </Helmet>

            <div className='w-full mb-5'>
                <form data-aos="fade-up-right" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className=' text-center font-extrabold text-3xl mb-5'>Add Colleges</h1>
                    <div className="divider"></div>

                    <div className="px-24">

                        <div>
                            <label className="label">
                                <span className="text-center">College name</span>
                            </label>
                            <input
                                type="name"
                                {...register('CollegeName')}
                                placeholder="Enter Your College name"
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>


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


                        <div>
                            <label className="label">
                                <span className="text-center">Admission Date</span>
                            </label>
                            <input
                                type="date"
                                {...register('AdmissionDate')}
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>


                        <div>
                            <label className="label">
                                <span className="text-center">Events</span>
                            </label>
                            <textarea
                                type="text"
                                min={0}

                                {...register('Events')}
                                placeholder="Enter Your Collage Events"
                                className="input input-bordered input-error w-full mb-2 h-20"
                                required
                            />
                        </div>




                        <div>
                            <label className="label">
                                <span className="text-center">College Location</span>
                            </label>
                            <textarea
                                type="text"
                                min={0}

                                {...register('CollegeLocation')}
                                placeholder="ex : Dhaka Mirpur"
                                className="input input-bordered input-error w-full mb-2 h-20"
                                required
                            />
                        </div>


                        <div>
                            <label className="label">
                                <span className="text-center">Research History </span>
                            </label>
                            <textarea
                                type="text"
                                min={0}

                                {...register('ResearchHistory')}
                                placeholder="Enter Your collage Research History"
                                className="input input-bordered input-error w-full mb-2 h-20"
                                required
                            />
                        </div>


                        <div>
                            <label className="label">
                                <span className="text-center">Sports</span>
                            </label>
                            <textarea
                                type="text"
                                min={0}

                                {...register('Sports')}
                                placeholder="Enter Your Sports Name"
                                className="input input-bordered input-error w-full mb-2 h-20"
                                required
                            />
                        </div>












                        {/* <div>
                            <label className="label">
                                <span className="text-center justify-center">Rating</span>
                            </label>
                            <input
                                type="number"
                                max={5}
                                min={0}
                                {...register('Rating')}
                                placeholder="Enter your Toy name"
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div> */}

                        <button className="btn btn-outline btn-secondary" type="submit">
                            Add College
                        </button>
                    </div>
                </form>

            </div>
        </>

    );
};

;

export default AddColleges;
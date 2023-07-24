import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import UseAuth from '../Hooks/UseAuth';


const img_hosting = process.env.REACT_APP_Image_Upload_token;



const AdmissionForm = () => {
    const [loading, setLoading] = useState(false);
    const data = useLoaderData();
    const { User } = UseAuth();
    // console.log(User.email);




    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting}`

    const onSubmit = data => {
        setLoading(true);

        const formData = new FormData();
        formData.append('image', data.Image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const imgUrl = result.data.display_url;
                    const ApplyCollage = {
                        collegeName: data.collegeName,
                        Name: data.Name,
                        status: data.status,
                        DateOfBirth: data.DateOfBirth,
                        StudentEmail: data.StudentEmail,
                        PhonNumber: data.PhonNumber,
                        Address: data.Address,
                        StudentImage: imgUrl,

                    };

                    fetch('http://localhost:5000/ApplyCollage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(ApplyCollage)
                    })
                        .then(response => response.json())
                        .then(data => {
                            setLoading(false);
                            if (data.insertedId) {
                                reset();
                                Swal.fire(
                                    'Apply College successfully',
                                    'Thanks for Apply',
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
                <title>Admission Form || PH JOB TASK </title>
            </Helmet>

            <div className='w-full mb-5'>
                <form data-aos="fade-up-right" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className=' text-center font-extrabold text-3xl mb-5'>Add Colleges</h1>
                    <div className="divider"></div>

                    <div className="px-24">




                        <div>
                            <label className="label">
                                <span className="text-center">Collage Name</span>
                            </label>
                            <input
                                type="name"
                                {...register('collegeName')}
                                placeholder="Enter your Name"
                                value={data.CollegeName}
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>





                        <div>
                            <label className="label">
                                <span className="text-center">Name</span>
                            </label>
                            <input
                                type="name"
                                {...register('Name')}
                                placeholder="Enter your Name"
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>

                        <div className='mt-5 mb-5'>
                            <label className="label">
                                <span className="text-center text-2xl font-bold text-black">Subject Selection </span>
                            </label>

                            <select className="text-input input input-bordered input-error w-full mb-2"
                                {...register("status")}>
                                <option value="science">Science</option>
                                <option value="humanistic">Humanistic</option>
                                <option value="business">business</option>


                            </select>

                        </div>

                        <div>
                            <label className="label">
                                <span className="text-center">Date of Birth</span>
                            </label>
                            <input
                                type="date"
                                {...register('DateOfBirth')}
                                placeholder="Enter your Name"
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>




                        <div>
                            <label className="label">
                                <span className="text-center">Your Email</span>
                            </label>
                            <input
                                type="email"
                                {...register('StudentEmail')}
                                value={User.email}
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>


                        <div>
                            <label className="label">
                                <span className="text-center">Phon Number </span>
                            </label>
                            <input
                                type="number"
                                minLength={11}
                                maxLength={11}
                                {...register('PhonNumber')}
                                placeholder="0178********"
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>


                        <div>
                            <label className="label">
                                <span className="text-center">Address</span>
                            </label>
                            <input
                                type="text"
                                {...register('Address')}
                                placeholder="ex: Rangpur,bangladesh"
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>








                        <div>
                            <label className="label">
                                <span className="text-center">Your Image</span>
                            </label>
                            <input
                                type="file"
                                {...register('Image')}
                                className="input input-bordered input-error w-full mb-2"
                                required
                            />
                        </div>

                        <button className="btn btn-outline btn-secondary" type="submit">
                            submit
                        </button>
                    </div>
                </form>

            </div>
        </>

    );
};

;


export default AdmissionForm;
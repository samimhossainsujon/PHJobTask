import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const MyCollege = () => {
  const [collages, setCollage] = useState([]);
  const [showModal, setShowModal] = useState(false); // Added state for modal visibility
  const [rating, setRating] = useState(1); // Default rating value

  useEffect(() => {
    fetch('http://localhost:5000/ApplyCollage')
      .then((response) => response.json())
      .then((data) => {
        setCollage(data);
        console.log(data);
      });
  }, []);

  const handleRettingNawClick = () => {
    setShowModal(true);
  };

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);

    // Add the rating value to the data being submitted
    data.rating = rating;

    fetch('http://localhost:5000/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.insertedId) {
          reset();
          setShowModal(false);
          Swal.fire('Apply College successfully', 'Thanks for Apply', 'success');
        } else {
          Swal.fire('Error', 'An error occurred while adding the college', 'error');
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire('Error', 'An error occurred while adding the college', 'error');
      });
  };

  return (
    <div>
      <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {collages.map((collage, index) => (
          <div key={index}>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="avatar flex justify-center items-center">
                <div className="w-36 rounded-full">
                  <img src={collage.StudentImage} alt="" />
                </div>
              </div>
              <div className="card-body">
                <h1 className="text-xl font-bold">{collage.collegeName}</h1>
                <h1>
                  <span className="font-bold text-blue-500 ">Name:</span> {collage.Name}
                </h1>
                <h1>
                  <span className="font-bold text-blue-500 ">Phon Number:</span> {collage.PhonNumber}
                </h1>
                <h1>
                  <span className="font-bold text-blue-500 ">Subject:</span> {collage.status}
                </h1>
                <h1>
                  <span className="font-bold text-blue-500 ">Date Of Birth:</span> {collage.DateOfBirth}
                </h1>
                <h1>
                  <span className="font-bold text-blue-500 ">Student Email:</span> {collage.StudentEmail}
                </h1>
                <h1>
                  <span className="font-bold text-blue-500 ">Address:</span> {collage.Address}
                </h1>

                <button onClick={handleRettingNawClick} className="btn btn-primary">
                  retting naw
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <dialog id="my_modal_1" className="modal" open>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box">
            <h3 className="text-center font-bold text-lg">Retting Now</h3>

            <div className="flex justify-center items-center">
              <div className="rating">               
                <input type="radio" name="rating-1" className="mask mask-star" onChange={() => setRating(1)} checked/>
                <input type="radio" name="rating-1" className="mask mask-star" onChange={() => setRating(2)} />
                <input type="radio" name="rating-1" className="mask mask-star" onChange={() => setRating(3)}  />
                <input type="radio" name="rating-1" className="mask mask-star" onChange={() => setRating(4)} />
                <input type="radio" name="rating-1" className="mask mask-star" onChange={() => setRating(5)} />
              </div>
            </div>

            <div className="flex justify-center items-center mt-5">
              <textarea
                type="text"
                placeholder="Your feedback"
                {...register('Feedback')}
                className="input input-bordered input-secondary w-full max-w-xs h-20"
                required
              />
            </div>

            <div className="flex justify-between mt-10 ">
              <button type="submit" className="btn">
                submit
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default MyCollege;

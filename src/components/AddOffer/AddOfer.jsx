// AddOffer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './AddOfer.module.css'
import { useAddOfferMutation } from '../../services/offer';
import {useProjectDetailsQuery } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function AddOffer({ data, onOfferAdded }) {
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, trigger, formState: { errors } } = useForm();
  const { data: projectData, isFetching, refetch } = useProjectDetailsQuery(data);
  const [addOffer, { isLoading, isError, isSuccess }] = useAddOfferMutation();
  

  useEffect(() => {
    if (isSuccess) {
      // If offer is successfully added, refetch project details to update projectData
      refetch();


    }
  }, [isSuccess, refetch]);

  
  const onSubmit = async (values) => {
    try {
      console.log(data)
      console.log(values)
      const response = await addOffer({ ...values, project: data });
  console.log('Offer added successfully:', response);
  if(response.data.success){
toast.success("Success Notification !")

  }
  console.log(response.data.success)

        // onOfferAdded(response.data.offer); // Notify parent component about the new offer
      
    } catch (error) {
      setErrorMessage(error.message); // Handle error
    }
  };

  return (
    <>
      <ToastContainer/>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 d-flex">
        <div className="INP1 col-6 col-sm-4 me-2 me-md-5">
          <label htmlFor="exampleFormControlInput1" className="form-label">Time</label>
          <div className="d-flex align-items-center">
            <input
              {...register("time", { required: "You must enter time" })}
              type="number" className="form-control me-1" id="exampleFormControlInput1" placeholder="5"
              onBlur={() => trigger("time")}
            />
            <h5 className="pt-2">Days</h5>
          </div>
        </div>
        <div className="INP2 col-6 col-sm-5">
          <label htmlFor="exampleFormControlInput2" className="form-label">Price</label>
          <div className="d-flex align-items-center">
            <input
              {...register("price", { required: "You must enter your Price" })}
              type="number" className="form-control me-1" id="exampleFormControlInput2" placeholder="10"
              onBlur={() => trigger("price")}
            />
            <h4 className="pt-2">$</h4>
          </div>
        </div>
      </div>
      <div className="mb-3 col-11">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
        <textarea
          {...register("description", { required: "You must enter your email address" })}
          type="text" className="form-control" id="exampleFormControlTextarea1" rows="9"
          onBlur={() => trigger("description")}
        ></textarea>
      </div>
      <button style={{ backgroundColor: "#c59a5a" }} className={` rounded-5 mb-3 p-1 px-2 text-white ${styles.AddOfferButton}`} size="lg">Add Offer</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
    </>
  );
}

export default AddOffer;

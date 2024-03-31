/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import styles from './UserProjectsOffer.module.css';
import image from '../../../public/images/man-300x300.png';
import { useUpdateOfferMutation } from '../../services/offer';
import ChatComponent from '../ChatComponent/ChatComponent'; // Import your chat component
import { useSocketContext } from '../../../context/SocketContext';

function UserProjectsOffer({ data }) {
  console.log("data", data);
  const [showChat, setShowChat] = useState(false);
  const difference = Math.round(Date.now() - new Date(data?.createdAt).getTime());
  let time;

  if (Math.abs(difference) < 1000 * 60 * 60) {
    time = Math.round(Math.abs(difference) / (1000 * 60)) + "m";
  } else if (Math.abs(difference) < 1000 * 60 * 60 * 24) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60)) + "h";
  } else if (Math.abs(difference) < 1000 * 60 * 60 * 24 * 365) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24)) + "d";
  } else {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24 * 365)) + "y";
  }

  const [updateOffer, { isLoading, error }] = useUpdateOfferMutation();
  const [status, setStatus] = useState(data.status);
  

  

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await updateOffer({
        offerId: data?._id,
        updatedData: { status: newStatus }
      });

      if (response.error) {
        console.error('Update failed');
      } else {
        setStatus(newStatus); // Update local state if mutation succeeds
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const toggleChat = () => {
    setShowChat(prevState => !prevState); // Toggle chat visibility
  };

  return (
    <div className='container'>
      <div className="designer my-2">
        <div className="d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center border-2 border-dark">
            <div className={``}>
              <img className={`${styles.userImage} me-4`} src={'http://localhost:3000/' + data?.createdBy.image} alt='' />
            </div>
            <div className="pt-2">
              <h5 className='my-0'>{data?.createdBy.userName}</h5>
              <div className="d-flex">
                <p className='me-3'><i className="fa-solid fa-briefcase"></i> 3D designer</p>
                <p><i className="fa-regular fa-clock"></i> {time}</p>
              </div>
            </div>
          </div>
          {data?.status === 'accepted' ? <label className=' bg-success px-2 rounded '>{data?.status}</label> : <label className=' bg-danger px-2 rounded '>{data?.status}</label>}
        </div>
        <p className='mb-3 px-2 overflow-hidden'>{data?.description}</p>
        <div className=" d-flex justify-content-center">
          {!(data?.status === 'accepted') && <p className='btn btn-success ' onClick={() => handleUpdateStatus('accepted')}>Accept <i className="fa-solid fa-check"></i></p>}
          <p className='btn btn-danger mx-3' onClick={() => handleUpdateStatus('rejected')}>Reject <i className="fa-solid fa-xmark"></i></p>
          {/* Button to toggle chat */}
          <p className='btn btn-primary' onClick={toggleChat}>Contact <i className="fa-brands fa-telegram"></i></p>
          
        </div>
        <div className="d-block">
          {showChat && <ChatComponent  senderData={data} />}
          </div>
        <span></span>
      </div>

      {/* Render chat component if showChat is true */}
      
    </div>
  )
}

export default UserProjectsOffer;

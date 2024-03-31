import React from 'react'
import styles from './Offer.module.css'
import image from '../../../public/images/man-300x300.png'
function Offer({data}) {
  console.log("data",data)

  const difference = Math.round((Date.now() - new Date(data?.createdAt).getTime()));
  let time;

  if (Math.abs(difference) < (1000 * 60 * 60)) {
    time = Math.round(Math.abs(difference) / (1000 * 60)) + "m";
  } else if (Math.abs(difference) < (1000 * 60 * 60 * 24)) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60)) + "h";
  } else if (Math.abs(difference) < (1000 * 60 * 60 * 24 * 365)) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24)) + "d";
  } else {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24 * 365)) + "y";
  }
  return (
    <div className='container'>
      <div className="designer my-2">
      <div className="d-flex align-items-center border-2 border-dark">
        <div className={``}>
        <img className={`${styles.userImage} me-4`} src={'http://localhost:3000/'+ data.createdBy.image} alt='' />
        </div>
        <div className="pt-2">
          <h5 className='my-0'>{data.createdBy.userName}</h5>
          <div className="d-flex">
            <p className='me-3'><i className="fa-solid fa-briefcase"></i> 3D designer</p>
            <p><i className="fa-regular fa-clock"></i> {time}</p>
          </div>
        </div>

      </div>
      <p className='mb-3 px-2 overflow-hidden'>{data.description}</p>
      <span></span>
      </div>

    </div>
  )
}

export default Offer
import React from 'react'
import styles from './UserProjectsOffer.module.css'
import image from '../../../public/images/man-300x300.png'
function UserProjectsOffer({data}) {
  console.log("data",data)
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
            <p><i className="fa-regular fa-clock"></i> time</p>
          </div>
        </div>

      </div>
      <p className='mb-3 px-2 overflow-hidden'>{data.description}</p>
      <span></span>
      </div>

    </div>
  )
}

export default UserProjectsOffer
import React from 'react'

function ProjectsGallery() {
  return (
    <div className='contain'>
     
        {/* <div className='projectcontanier'> */}
        <div className='showbox'>
        <div className='content'>
        <h4>Project Title </h4>
        <p><i className="fa-solid fa-user ms-2"></i>User Name   <i className="fa-regular fa-clock  ms-2"></i>from 2 hour   <i className="fa-solid fa-marker ms-2"></i> 7 offers </p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente sunt officia odit accusamus tenetur nisi dolor, quae pariatur ab deleniti minima eum at quod nam reprehenderit, numquam eaque. At, doloribus!</p>
        </div>
        <div className='title'>
        <button className='btn '> Add Offer</button>
        </div>
      
        </div>
       
        {/* </div> */}
    </div>
  )
}

export default ProjectsGallery
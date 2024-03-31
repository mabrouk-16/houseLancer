import { useNavigate } from 'react-router-dom';
import styles from './UserProjects.module.css';
import { useDeleteProjectMutation, useUpdateProjectMutation } from '../../services/api';
import { useState } from 'react';

function UserProjects({ data }) {
  const nav = useNavigate();
  const [updateProject, { isLoading, isError, error }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading:deleteLoading, isError:deleteIsError, error:deleteError }] = useDeleteProjectMutation();
  const [updatedData, setUpdatedData] = useState();
  const projectId=data._id
  function goToProjectDetails() {
    nav(`/userprojectdetails/${data._id}`, { state: data });
  }
const handleUpdate = (newStatus) => {
  // Update the status in updatedData
  const updatedData = {
    status: newStatus,
  };

  updateProject({ projectId, updatedData }) // Pass as an object
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    });
};
const handleDelete = () => {
 

  deleteProject(projectId) // Pass as an object
.then((response) => {
  console.log(response);
})
.catch((error) => {
  console.log(error)
});
};


  function getTitle(str) {
    let title = str.split(' ', 5);
    return title.join(' ');
  }

  function getDesc(str) {
    let title = str.split(' ', 15);
    return title.join(' ');
  }

  // Calculate the time difference directly inside the component
  const difference = Math.round((Date.now() - new Date(data.createdAt).getTime()));
  let time;

  if (Math.abs(difference) < (1000 * 60 * 60)) {
    time = Math.round(Math.abs(difference) / (1000 * 60)) + " minutes";
  } else if (Math.abs(difference) < (1000 * 60 * 60 * 24)) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60)) + " hours";
  } else if (Math.abs(difference) < (1000 * 60 * 60 * 24 * 365)) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24)) + " days";
  } else {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24 * 365)) + " years";
  }

  return (
    <div className={` ${styles.contain}`}>
      <div className={`row ${styles.showbox}`}>
        <div className={`col-md-8 ${styles.content}`}>
          <div className="">
            <h4 onClick={goToProjectDetails} className={`${styles.projectTitle}`}>{getTitle(data?.title)}</h4>
          </div>
          <div className="">
          <p>
            <img className={`${styles.userImage} me-2`} src={"http://localhost:3000/" + data?.createdBy?.image} alt="" />
            {data?.createdBy?.firstName}
            <i className="fa-regular fa-clock  mx-2"></i>{time}
            <i className="fa-solid fa-marker mx-2 "></i>{data.offer?.length} offers
          </p>
          <p>{getDesc(data?.description)}</p>
          </div>
        </div>
        <div className={`col-md-4 d-flex flex-row flex-md-column align-items-center   align-items-md-end     ${styles.title}`}>
              <button className={`w-100 w-md-50  ${styles.addOffer}`} onClick={() => handleDelete()}> Delete <i className="fa-solid fa-trash-can"></i></button>
              <button className={`w-100 w-md-50 my-2 mx-2 mx-md-0   ${styles.addOffer}`} onClick={() => handleUpdate('closed')}>Close <i className="fa-regular fa-circle-xmark"></i></button>
              <button className={`w-100 w-md-50   ${styles.addOffer}`} onClick={() => handleUpdate('completed')}>Done <i className="fa-regular fa-circle-check"></i></button>
            </div>
      </div>
    </div>
  );
}

export default UserProjects;

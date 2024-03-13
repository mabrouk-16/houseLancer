import React, { useEffect, useRef, useState } from 'react';
import Project from '../Project/Project';
import styles from './Projects.module.css';
import { useGetProjectsQuery } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import AddProject from '../AddProject/AddProject';

function Projects() {
  const nav = useNavigate();

  const { data, isFetching ,isSuccess} = useGetProjectsQuery();
  const [projects, setProjects] = useState([]);


  const [showModal, setShowModal] = useState(false);
  const myInputRef = useRef(null);

  

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };
  
  useEffect(() => {
    if (data) {
      // Create a new array by spreading the original data array
      const sortedProjects = [...data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProjects(sortedProjects);
    }
  }, [data]);

  return (
    <>
    
      {isFetching ? (
        <div id="loading-wrapper">
          <div id="loading-text">LOADING</div>
          <div id="loading-content"></div>
        </div>
      ) : (
        <div className="">
          <div className="container d-flex justify-content-between">
            <h2 className="m-3 mt-5">All Projects :</h2>
            <button onClick={() => { hideModalHandler() }}  data-bs-toggle="modal" data-bs-target="#exampleModal"className={`me-5 mt-5 ${styles.addProject}`}>
              <i className="fa-solid fa-add fs-4 m-auto "></i>
            </button>
          </div>
          {projects.map((item) => {
            return (
              <div key={item._id}>
                <Project data={item} />
              </div>
            );
          })}
        </div>
      )}:<div>
  <>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className={`modal-dialog modal-L ${styles.add_Project}`}>
    <div className={`modal-content ${styles.add_Project}`}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <AddProject/>
      </div>
      
    </div>
  </div>
</div>
  </>

    </div> 
    </>
  );
}

export default Projects;

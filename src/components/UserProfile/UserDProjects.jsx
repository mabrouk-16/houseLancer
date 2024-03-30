import { useEffect, useState } from "react";
import UserProjects from "../UserProjects/UserProjects";
import styles from './UserProfile.module.css';
import { useUserProjectsQuery } from "../../services/api";

function UserDProjects() {

  const { data, isFetching ,isSuccess} =useUserProjectsQuery();
  console.log(data)
  const [projects, setProjects] = useState([]);



  
  useEffect(() => {
    if (data) {
      // Create a new array by spreading the original data array
      const sortedProjects = [...data.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProjects(sortedProjects);
    }
  }, [data]);

  return (
    <>
    
      <div >
      {isFetching ? (
        <div id="loading-wrapper">
          <div id="loading-text">LOADING</div>
          <div id="loading-content"></div>
        </div>
      ) : (
        <div className={`  ${styles.user_projects}`}>
          
          {projects.map((item) => {
            return (
              <div key={item._id}>
                <UserProjects data={item} />
              </div>
            );
          })}
        </div>
      )}:<div>
  <>
  </>

    </div> 
      </div>
    </>
  );
}
export default UserDProjects
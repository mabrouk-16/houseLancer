
import { useEffect } from "react";
import styles from './UserProfile.module.css'
import { useUserProfileIdQuery} from "../../services/user";
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  // Fetch user profile data
  const { data, error, isLoading,refetch } = useUserProfileIdQuery(); // Replace "userId" with the actual user ID

  // Log data in console
  useEffect(() => {
    if (data) {
      console.log("User Profile Data:", data.data);
      refetch()
    }
    if (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [data, error]);

  if (isLoading) return <div id="loading-wrapper">
  <div id="loading-text">LOADING</div>
  <div id="loading-content"></div>
</div>;

  return (
    <>

      <div className={`${styles["profile_container"]}  `}>
        <div className={`${styles.user_layer}`}>
          <div className={`container  ${styles.user_profile} rounded-bottom-3  `}>
            <img className={`${styles.userProfile_image} mt-5  mb-2`} src={`http://localhost:3000/` + data?.data.image} alt="" />
            <h3>{data?.data.userName}</h3>
            <div className={` d-flex justify-content-center ${styles.user_details}`}>
              <p className="me-3"><i className="fa-solid fa-user"></i> {data?.data.role}</p>
              <p className="me-3"><i className="fa-solid fa-briefcase"></i> Interior Designer</p>
              <p><i className="fa-solid fa-location-dot"></i> {data?.data.city}</p>
            </div>
            <div className={ ` container ${styles.user_btn} w-100 ms-auto   d-flex justify-content-start flex-wrap`}>
            <NavLink to='aboutUser' className={`btn   ${styles.active_btn}`}><i className="fa-solid fa-user me-1  "></i>Profile</NavLink>
            {data?.data.role=='User'&& <NavLink to='userProjects' className={`btn ${styles.active_btn}`}><i className="fa-solid fa-briefcase me-1"></i> Projects</NavLink>}
              {data?.data.role=='Designer'&& <NavLink to='designerGallery' className={`btn ${styles.active_btn}`}><i className="fa-solid fa-image me-1"></i> Gallery</NavLink>} 
              {data?.data.role=='Designer'&& <NavLink to='designerOffers' className={`btn ${styles.active_btn}`}><i className="fa-solid fa-briefcase me-1"></i> Offers</NavLink>} 
            </div>
          </div>
          <div className={`container  mt-3 ${styles.user_outlet}`}><Outlet aboutdata={data} /></div>
         

        </div>
      </div>
    </>
  );
}

export default UserProfile;


import logo from '../../../public/images/logoitidark.png'
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'
import userImage from '../../../public/images/man-300x300.png'
import { useSocketContext } from '../../../context/SocketContext';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
function Navbar({ userData,logOut }) {


      const user=JSON.parse(localStorage.getItem('userData'))
      // const userProfileData = useSelector((state) => state.user.profile);
      const { socket } = useSocketContext();
  const [notification, setNotification] = useState([]);
useEffect(() => {
    socket?.on("notification", (notification) => {
      setNotification(prevNotifications => [...prevNotifications, notification]);
    });

    return () => socket?.off("notification");
  }, [socket]);
  console.log(notification)
    return (
        <>
        <nav style={{ 'zIndex': '1000'}} className="navbar navbar-expand-lg navbar-light bg-body-tertiary " >
      <div  className="container-fluid">
        <NavLink className="navbar-brand" to="/">
            <img className={`${styles.logo}`} src={logo} alt="house lancer logo" />
        </NavLink>
        <button className={`navbar-toggler ${styles.noBoxShadow}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span  className="fa-solid fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="about" role="button">About</NavLink>
            </li>
            {userData && <li className="nav-item">
              <NavLink className="nav-link" to="projects">Projects</NavLink>
            </li>}
            {userData && <li className="nav-item">
              <NavLink className="nav-link" to="designer">Find Designer</NavLink>
            </li>}
            {userData && <li className="nav-item">
              <NavLink className="nav-link" to="gallery">Projects Gallery</NavLink>
            </li> }
            
            
              
            <li className="nav-item">
              <NavLink className="nav-link" to="contact">Contact US</NavLink>
            </li>  
          </ul>
          {!userData && <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <NavLink className="nav-link" to="login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="register">Register</NavLink>
            </li>   
          </ul>}
        {userData && <div className="d-flex  align-items-center  ">
        <div className="mx-2 me-4">
        <i className="fa-solid fa-bell fs-5"></i>
        </div>
        <div className="mx-2 me-5">
        
        <div className={`dropdown  `}>
            <NavLink to="profile" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown"  aria-expanded="false">
            <i className="fa-solid fa-message  fs-5"></i>
            </NavLink>
            <ul
              className={`dropdown-menu dropdown-menu-lg-end mt-lg-4 mt-3 text-center ${styles.profileMenu}`}
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              
              <li>
                
               { notification?.map((item)=>(
                  <><div className="d-flex justify-content-center align-items-center">
                    <NavLink to="designer/designerOffers">{item.message}</NavLink>
                    </div></>
                
               ))}
              </li>
              <li>
                <span className={`${styles.linkss} btn mt-2 mb-3`}  role='button' onClick={logOut} >Logout</span>
              </li>
            </ul>
          </div>
        </div>
          <div className={`dropdown  `}>
            <NavLink to="profile" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown"  aria-expanded="false">
              <img
                src={user?.image||userImage}
                className="rounded-circle"
                height="40"
                width="40"
                alt="user Image"
                loading="lazy"
              />
            </NavLink>
            <ul
              className={`dropdown-menu dropdown-menu-lg-end mt-lg-3 mt-2 text-center ${styles.profileMenu}`}
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li className='d-flex align-items-center justify-content-center mt-2'>
              <img
                src={user?.image}
                className="rounded-circle me-4 ms-2"
                height="40"
                width="40"
                alt="user Image"
                loading="lazy"
              />
                <NavLink className={`${styles.linksss} fs-6 bg-transparent `} role="" to="profile">{user?.userName}</NavLink>
              </li>
              <li>
                <NavLink className={`${styles.linkss} btn mt-3`} to="setting">Settings</NavLink>
              </li>
              <li>
                <span className={`${styles.linkss} btn mt-2 mb-3`}  role='button' onClick={logOut} >Logout</span>
              </li>
            </ul>
          </div>
        </div>}
        <div className="">

        </div>
        </div>
      </div>
    </nav>
       
    </>
      );
    }
    
    export default Navbar;
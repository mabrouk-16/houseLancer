
import logo from '../../../public/images/logoitidark.png'
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'
import userImage from '../../../public/images/man-300x300.png'
import { useSocketContext } from '../../../context/SocketContext';
import { useEffect, useState } from 'react';
import { useGetNotificationQuery } from '../../services/chat';
import notificationSound from '../../assets/sounds/notification.mp3'
// eslint-disable-next-line react/prop-types
function Navbar({ userData, logOut }) {

  const { data, error, isLoading,refetch } = useGetNotificationQuery()
  const user = JSON.parse(localStorage.getItem('userData'))
  // const userProfileData = useSelector((state) => state.user.profile);
  const { socket } = useSocketContext();
  const [notification, setNotification] = useState([]);
  const [messageCounter, setMessageCounter] = useState(0)
  useEffect(() => {
    if (data) {
      const sortedNotifications = [...data.notifications].reverse();
      setNotification(sortedNotifications);
    }
  }, [data]);

  useEffect(() => {
    const handleNotification = (notification) => {
      setNotification((prevNotifications) => [ notification,...prevNotifications,]);
      setMessageCounter((prevCounter) => prevCounter + 1);
      refetch()
      const sound = new Audio(notificationSound);
        sound.play();
    };

    if (socket) {
      socket.on('messageNotification', handleNotification);
    }

    return () => {
      if (socket) {
        socket.off('messageNotification', handleNotification);
      }
    };
  }, [socket]);
 
  return (
    <>
      <nav style={{ 'zIndex': '1000' }} className="navbar navbar-expand-lg navbar-light bg-body-tertiary " >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img className={`${styles.logo}`} src={logo} alt="house lancer logo" />
          </NavLink>
          <button className={`navbar-toggler ${styles.noBoxShadow}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="fa-solid fa-bars"></span>
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
              {/* {userData && <li className="nav-item">
                <NavLink className="nav-link" to="designer">Find Designer</NavLink>
              </li>}
              {userData && <li className="nav-item">
                <NavLink className="nav-link" to="gallery">Projects Gallery</NavLink>
              </li>} */}



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

                <div className={`dropdown position-relative   `}>
                  <NavLink to="profile" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-message  fs-5"></i>
                  </NavLink>
                  <div className="">
              {messageCounter > 0 && <span className={`badge bg-danger position-absolute rounded rounded-9 ${styles.badge}`}> <span className='d-flex justify-content-center'>{messageCounter}</span> </span>}
            </div>
                  <ul
                    className={`dropdown-menu dropdown-menu-lg-end mt-lg-4 mt-3 text-start p-1  ${styles.message}`}
                    aria-labelledby="navbarDropdownMenuAvatar"
                  >



                    {notification?.map((item, idx) => (
                      <li key={idx} className="d-flex justify-content-center align-items-center bg-body-secondary m-1 p-1">
                        <NavLink to="designer/designerOffers"><span className='text-black'>new message from</span> <span className='text-warning'>{item.name}</span> &#34;<span className=' text-'>{item.content}</span>&#34;</NavLink>
                      </li>
                    ))}


                  </ul>
                  
                </div>
              </div>
              <div className={`dropdown  `}>
                <NavLink to="profile" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img
                    src={user?.image || userImage}
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
                    <span className={`${styles.linkss} btn mt-2 mb-3`} role='button' onClick={logOut} >Logout</span>
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
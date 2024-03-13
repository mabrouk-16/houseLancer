
import logo from '../../../public/images/logoitidark.png'
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'
import userImage from '../../../public/images/man-300x300.png'
// eslint-disable-next-line react/prop-types
function Navbar({ userData,logOut }) {
  
      const user=JSON.parse(localStorage.getItem('userData'))
      console.log(userData)
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
            <li className="nav-item">
              <NavLink className="nav-link" to="projects">Projects</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="designer">Find Designer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="gallery">Projects Gallery</NavLink>
            </li>   
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
        <i className="fa-solid fa-message  fs-5"></i>
        </div>
          <div className={`dropdown  `}>
            <NavLink to="profile" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img
                src={user.image||userImage}
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
                src={user.image}
                className="rounded-circle me-4 ms-2"
                height="40"
                width="40"
                alt="user Image"
                loading="lazy"
              />
                <NavLink className={`${styles.linksss} fs-6`} to="profile">{user.userName}</NavLink>
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
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      
      <div className="container-fluid">
        
        <button
          data-mdb-collapse-init
          className="navbar-toggler shadow"
          type="button"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Team</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Projects</a>
            </li>
          </ul>
          
        </div>
        
        <div className="d-flex align-items-center">
        
          <a className="text-reset me-3" href="#">
            <i className="fas fa-shopping-cart"></i>
          </a>

          
          <div className="dropdown">
            <a
              data-mdb-dropdown-init
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              aria-expanded="false"
            >
              <i className="fas fa-bell"></i>
              <span className="badge rounded-pill badge-notification bg-danger">1</span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="#">Some news</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Another news</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Something else here</a>
              </li>
            </ul>
          </div>
          
          <div className="dropdown">
            <a
              data-mdb-dropdown-init
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              aria-expanded="false"
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="25"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <a className="dropdown-item" href="#">My profile</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Settings</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
        
      </div>
      
    </nav> */}
    </>
      );
    }
    
    export default Navbar;
import React from 'react'
import { Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './User.scss'
import General from './General'
import UserBar from './UserBar';
import ChangePass from './ChangePass';
import SocialLinks from './SocialLinks';
import Connection from './Connection';
import Info from './Info';
import Gallary  from './Gallary';
import Notification from './Notification';
import './User.scss'
function UserProfile() {
  return (
    < div className='profilecontainer'>
    
    <div className="container light-style flex-grow-1  container-p-y  py-2 bachground ">
     <div className="card overflow-hidden ">
    <div className="row no-gutters row-bordered row-border-light    ">
    <UserBar/>
    <div className="col-md-10">
        <div className="tab-content">
    <Routes>  
    <Route path="/" element={<General/>} />
    <Route path="general" element={<General/>} />
    <Route path="change-password" element={<ChangePass/>} />  
    <Route path="info" element={<Info/>} />
    <Route path="social-links" element={<SocialLinks/>} />
    <Route path="connections" element={<Connection/>} />
    <Route path="gallary" element={<Gallary/>} />

    </Routes>
        
      </div>
      </div>
        </div>
        </div>
        
          </div>
        </div>
  )
}

export default UserProfile
import React, {  useState } from 'react';
import { NavLink } from 'react-router-dom';


function UserBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={`col_side  text-center py-2 ${isCollapsed ? 'collapsed' : ''} bg-side`}>
      <button className="btn btn-collapse" onClick={toggleCollapse}>
        {isCollapsed ? <i className="fa-solid fa-angles-right"></i> : <i className="fa-solid fa-angles-left"></i>}
      </button>
      
        <div className="list-group list-group-flush account-settings-links">
          <NavLink className="list-group-item list-group-item-action active" data-toggle="list" to="general">{isCollapsed?<i className="fa-solid fa-user"></i>:"General"}</NavLink>
          <NavLink className="list-group-item list-group-item-action " data-toggle="list" to="changepass">{isCollapsed?<i className="fa-solid fa-key"></i>:"Change password"}</NavLink>
          <NavLink className="list-group-item list-group-item-action " data-toggle="list" to="info">{isCollapsed?<i className="fa-regular fa-address-card "></i>:"Information"} </NavLink>
          {/* <NavLink className="list-group-item list-group-item-action " data-toggle="list" to="social">{isCollapsed?<i className="fa-solid fa-share-from-square"></i>:"Social links"} </NavLink> */}
          {/* <NavLink className="list-group-item list-group-item-action " data-toggle="list" to="connection">{isCollapsed?<i className="fa-solid fa-paperclip"></i>:"Connections"} </NavLink> */}
          {/* <NavLink className="list-group-item list-group-item-action " data-toggle="list" to="gallary">{isCollapsed?<i className="fa-solid fa-image"></i>:"Gallary"} </NavLink> */}
        </div>
    </div>
  ); 







}
export default UserBar;

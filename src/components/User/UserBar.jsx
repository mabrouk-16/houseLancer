import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function UserBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`col-md-2 pt-0 text-center py-2 ${isCollapsed ? 'collapsed' : ''} bg-side`}>
      <button className="btn btn-collapse" onClick={toggleCollapse}>
        {isCollapsed ? <i className="fa-solid fa-angles-right"></i> : <i className="fa-solid fa-angles-left"></i>}
      </button>
      {!isCollapsed && (
        <div className="list-group list-group-flush account-settings-links">
          <NavLink className="list-group-item list-group-item-action active" data-toggle="list" to="general">General</NavLink>
          <NavLink className="list-group-item list-group-item-action Sidebar" data-toggle="list" to="change-password">Change password</NavLink>
          <NavLink className="list-group-item list-group-item-action Sidebar" data-toggle="list" to="info">Information</NavLink>
          <NavLink className="list-group-item list-group-item-action Sidebar" data-toggle="list" to="social-links">Social links</NavLink>
          <NavLink className="list-group-item list-group-item-action Sidebar" data-toggle="list" to="connections">Connections</NavLink>
          <NavLink className="list-group-item list-group-item-action Sidebar" data-toggle="list" to="gallary">Gallary</NavLink>
        </div>
      )}
    </div>
  );
}

export default UserBar;

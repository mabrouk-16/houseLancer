import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./User.scss";
import UserBar from "./UserBar";

import "./User.scss";
import { useUserProfileIdQuery } from "../../services/user";
function UserProfile() {
  const id = JSON.parse(localStorage.getItem("userData")).userId;
  console.log(id);
  const { data, isFetching, isSuccess } = useUserProfileIdQuery(id);
  console.log(data);

  return (
    <>
      {isFetching ? (
        <div id="loading-wrapper">
          <div id="loading-text">LOADING</div>
          <div id="loading-content"></div>
        </div>
      ) : (
        <div className="profilecontainer">
          <div className="container light-style flex-grow-1  container-p-y  py-2 bachground ">
            <div className="card ">
              <div className="row no-gutters row-bordered row-border-light    ">
                <div className="col-2">
                  <UserBar />
                </div>
                <div className="col-8">
                  <div className="tab-content">
                    <Outlet context={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;

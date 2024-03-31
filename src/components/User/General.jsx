import React, { useEffect, useState } from "react";
import profimg from "../../../public/images/team/Masoud.jpg";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
function General() {
  const userInfo = useOutletContext();
  const [data, setData] = useState({
    firstName: userInfo.data.firstName,
    lastName: userInfo.data.lastName,
    gender: userInfo.data.gender,
    firstName: userInfo.data.firstName,
  });
  // console.log(userInfo);

  const updateUser = () => {
    const token = localStorage.getItem("token");
    console.log(data);

    let updatedData = axios
      .put(`https://iti-final-be.onrender.com/user/updateUser/${userInfo.data._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `FINALITI__${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(updatedData);
    if (updatedData.success) {
      location.reload();
    }
  };

  return (
    <>
      <div className="contain active show" id="account-general">
        <div className="card-body media align-items-center m-2 ">
          <button type="file" className="border-0 bg-muted d-flex user_image">
            <img src={profimg} alt="no image" className="w-25 " />
          </button>
          {/* <div className="media-body ml-4">
                <label className="btn btn-outline-primary addimgbtn">
                 <i className="fa-solid fa-plus "></i>
                  <input type="file" className="account-settings-fileinput"  placeholder='+' />
                </label> &nbsp;
              </div> */}
        </div>

        <div className="card-body body-card">
          <div className="form-group first">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className="form-control mb-0"
              disabled
              defaultValue={userInfo.data.userName}
            />
          </div>
          <div className="form-group ">
            <label>Gender:</label>
            <br />
            <select
              className="gender"
              onChange={(e) => setData((prev) => (prev = { ...data, gender: e.target.value }))}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={userInfo.data.firstName}
              gender
              onChange={(e) => setData((prev) => (prev = { ...data, firstName: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              defaultValue={userInfo.data.lastName}
              onChange={(e) => setData((prev) => (prev = { ...data, lastName: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              type="text"
              className="form-control mb-1"
              disabled
              defaultValue={userInfo.data.email}
            />
            <div className="alert alert-warning mt-3">
              Your email is not confirmed. Please check your inbox.
              <br />
              <a href="" className="text-secondary">
                Resend confirmation
              </a>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Company</label>
            <input type="text" className="form-control" defaultValue="freelancer" />
          </div>

          <div className="savebtn">
            <button type="button" className="btn me-1" onClick={updateUser}>
              Save
            </button>
            &nbsp;
            <button type="button" className="btn " onClick={() => location.reload()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default General;

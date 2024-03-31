import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function ChangePass() {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  async function sendPass(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(data);
    await axios
      .patch(`https://iti-final-be.onrender.com/user/changePassword`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `FINALITI__${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          location.reload();
          nav("/login");
          // Redirect the user to the logout page or any other desired page
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <form onSubmit={(e) => sendPass(e)} className="contain" id="account-change-password">
      <div className="card-body pb-2">
        <div className="form-group">
          <label className="form-label">Current password</label>
          <div className="input-group ">
            <input
              required
              onChange={(e) => setData((prev) => (prev = { ...prev, oldPassword: e.target.value }))}
              type={showPassword ? "text" : "password"}
              className="form-control myinput"
              placeholder="Enter your current password"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary eye"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
              </button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">New password</label>
          <div className="input-group">
            <input
              required
              pattern="^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$"
              onChange={(e) => setData((prev) => (prev = { ...prev, newPassword: e.target.value }))}
              type={showPassword ? "text" : "password"}
              className="form-control myinput"
              placeholder="Enter your New password"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary eye"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
              </button>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Repeat new password</label>
          <div className="input-group">
            <input
              required
              onChange={(e) => setData((prev) => (prev = { ...prev, cPassword: e.target.value }))}
              type={showPassword ? "text" : "password"}
              className="form-control myinput"
              placeholder="Enter your current password"
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary eye"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
              </button>
            </div>
          </div>
        </div>
        <div className="savebtn save save3">
          <button type="submit" className="btn me-1 ">
            Save
          </button>
          &nbsp;
          <button type="button" className="btn " onClick={() => location.reload()}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChangePass;

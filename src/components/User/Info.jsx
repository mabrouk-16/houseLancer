import React from "react";
import { useOutletContext } from "react-router-dom";

function Info() {
  const userInfo = useOutletContext();
  console.log(userInfo);
  return (
    <div className="infocontain" id="account-info">
      <div className="card-body  pb-2 ">
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea className="form-control" rows={3} defaultValue={userInfo.data.about} />
        </div>
        {/* <div className="form-group">
          <label className="form-label">Birthday</label>
          <input type="date" className="form-control" defaultValue="May 3, 1995" />
        </div> */}
        {/* <div className="card-body pb-2"> */}
        {/* <h6 className="mb-2">Contacts</h6> */}
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" defaultValue={userInfo.data.phone} />
        </div>
        <div className="form-group ">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            defaultValue={userInfo.data.address}
          />
          {/* <div>
            <label className="form-label me-3 countrylabel">Country </label>
            <select className="custom-select me-5">
              <option>USA</option>
              <option>Canada</option>
              <option selected>Egypt</option>
              <option>UK</option>
              <option>Germany</option>
              <option>France</option>
            </select> */}
        </div>
        <div className="form-group">
          <label className="form-label me-3 ">City</label>
          <input
            type="text"
            className="form-control"
            name="city"
            defaultValue={userInfo.data.city}
          />
          {/* <select className="custom-select " value={"cairo"}>
            <option value={"cairo"}>Cairo</option>
            <option value={"giza"}>Giza</option>
            <option value={"aswan"} selected>
              Aswan
            </option>
            <option value={"loxur"}>loxur</option>
            <option value={"assiut"}>Assiut</option>
            <option value={"qena"}>Qena</option>
          </select> */}
        </div>

        {/* <div className="form-group">
        <label className="form-label">Website</label>
        <input type="text" className="form-control" defaultValue />
      </div> */}
        <div className="savebtn save2">
          <button type="button" className="btn me-1">
            Save
          </button>
          &nbsp;
          <button type="button" className="btn ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;

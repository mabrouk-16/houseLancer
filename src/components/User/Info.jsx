import React from 'react'

function Info() {
  return (
    <div className="infocontain" id="account-info">
    <div className="card-body  pb-2 ">
      <div className="form-group">
        <label className="form-label">Bio</label>
        <textarea className="form-control" rows={3} defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus."} />
      </div>
      <div className="form-group">
        <label className="form-label">Birthday</label>
        <input type="date" className="form-control" defaultValue="May 3, 1995" />
      </div>
      {/* <div className="card-body pb-2"> */}
      {/* <h6 className="mb-2">Contacts</h6> */}
      <div className="form-group">
        <label className="form-label">Phone</label>
        <input type="text" className="form-control" defaultValue="+0 (123) 456 7891" />
      </div>
      <div className="form-group  address">
        <div><label className="form-label me-3 countrylabel">Country </label>
        <select className="custom-select me-5">
          <option>USA</option>
          <option >Canada</option>
          <option selected>Egypt</option>
          <option>UK</option>
          <option>Germany</option>
          <option>France</option>
        </select>
<div className=''>
        <label className="form-label me-3 ">City</label>
        {/* <input type='text' className='form-control' name='city' defaultValue='your city'/> */}
        <select className="custom-select select2 ">
          <option>Cairo</option>
          <option >Giza</option>
          <option selected>Aswan</option>
          <option>loxur</option>
          <option>Assiut</option>
          <option>Qena</option>
        </select>
      </div>
        
        
      </div>
    </div>
    

      {/* <div className="form-group">
        <label className="form-label">Website</label>
        <input type="text" className="form-control" defaultValue />
      </div> */}
        <div className="savebtn save2">
                 <button type="button" className="btn me-1">Save</button>&nbsp;
                 <button type="button" className="btn ">Cancel</button>
                </div>
    </div>
  </div>
  )
}

export default Info
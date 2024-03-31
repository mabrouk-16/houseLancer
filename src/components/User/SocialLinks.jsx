import React from 'react'

function SocialLinks() {
  return (
    <div className="contain" id="account-social-links">
    <div className="card-body pb-2">
      <div className="form-group">
        <label className="form-label">Twitter</label>
        <input type="text" className="form-control" defaultValue="https://twitter.com/user" />
      </div>
      <div className="form-group">
        <label className="form-label">Facebook</label>
        <input type="text" className="form-control" defaultValue="https://www.facebook.com/user" />
      </div>
      <div className="form-group">
        <label className="form-label">Google+</label>
        <input type="text" className="form-control" defaultValue />
      </div>
      <div className="form-group">
        <label className="form-label">LinkedIn</label>
        <input type="text" className="form-control" defaultValue />
      </div>
      <div className="form-group">
        <label className="form-label">Instagram</label>
        <input type="text" className="form-control" defaultValue="https://www.instagram.com/user" />
      </div>
      <div className="savebtn save2">
                 <button type="button" className="btn me-1 ">Save</button>&nbsp;
                 <button type="button" className="btn ">Cancel</button>
                </div>
    </div>
  </div>
  )
}

export default SocialLinks
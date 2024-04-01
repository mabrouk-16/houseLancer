import React from 'react'
import'./landing.css'

const DisplaySection = ({triggerPreview}) => {
  
  const handleScrollToTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };
  
  return (
    <div className='display-section wrapper'>
      <div className="d-flex flex-column">
      <p className="text">join to us </p>
      <span className="description">
      you can join to us as a user and as a designer 
    
      </span>

      <button className="button" onClick={triggerPreview}>sign in </button>
      </div>
      <button className="back-button" onClick={handleScrollToTop}>TOP</button>
    </div>
  )
}

export default DisplaySection
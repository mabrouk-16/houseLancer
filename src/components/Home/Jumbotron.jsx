import React from 'react'


import'./landing.css'

const Jumbotron = () => {
  const handleLearnMore = () => {
    const element = document.querySelector('.sound-section');
    window.scrollTo({
      top: element?.getBoundingClientRect().top,
      left:0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className='jumbotron-section wrapper'>
      <h2 className="title">design your dream </h2>
  
      <p className="text">HOUSE LANCER</p>
      <span className="description">
      New technology that allows you to coordinate your home by 3d models
      </span>

      <ul className="links">
        <li>
          <button className="button">design your house</button>
        </li>

      
      </ul>

     
    </div>
  )
}

export default Jumbotron
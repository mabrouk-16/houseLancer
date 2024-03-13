import React from 'react'
import'./landing.css'

const SoundSection = () => {
  
  const handleLearnMore = () => {
    const element = document.querySelector('.display-section');
    window.scrollTo({
      top: element?.getBoundingClientRect().bottom,
      left: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="section_two">
      <div className='sound-section wrapper'>
      <div className="body">
        <div className="sound-section-content content">
          <p className="text">Feel the diffrents.</p>
          <span className="description">
         best interior designers to match your diffrents tastes 
          </span>

          <ul className="links">
            <li>
              <button className="button">interior designers</button>
            </li>

         
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SoundSection
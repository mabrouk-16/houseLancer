import React from 'react'


import './style.css'

import about1 from "../../../public/images/about/about-1.jpg";
import about2 from "../../../public/images/about/about-2.jpg";
import { Link } from 'react-router-dom';



function About() {

  

    
    return (
        <section id="about" className="about-area pt-80 pb-130">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="about-image mt-50 clearfix">
          <div className="single-image float-left">
            <img src={about1} alt="About" />
          </div> {/* single image */}
          <div  className="about-btn">
            <a className="main-btn" href="#"><span>27</span> Years Experience</a>
          </div>
          <div className="single-image image-tow float-right">
            <img src={about2} alt="About" />
          </div> {/* single image */}
        </div> {/* about image */}
      </div>
      <div className="col-lg-6">
        <div className="about-content mt-45">
          <h4 className="about-welcome">About Us </h4>
          <h3 className="about-title mt-10">Reasons to choose</h3>
          <p className="mt-25">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages
            <br /> <br />It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <Link className="main-btn mt-25" to="/">learn more</Link>
        </div> {/* about content */}
      </div>
    </div> {/* row */}
  </div> {/* container */}
</section>
       
    )
}

export default About
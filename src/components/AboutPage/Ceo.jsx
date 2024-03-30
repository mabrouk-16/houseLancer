import React from "react";
import "./style.css";


import negm from "../../../public/images/testimonial/negm.png";

function Ceo() {
  return (
    <section id="testimonial" className="testimonial-area pt-130 pb-130">
     
      <div className="container">
        <div className="testimonial-bg bg_cover  pt-80 pb-80">
          <div className="row">
            <div className="col-xl-4 offset-xl-7 col-lg-5 offset-lg-6 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
              <div className="testimonial-active">
                <div className="single-testimonial text-center">
                  <div className="testimonial-image">
                    <img src={negm} alt="Testimonial" />
                   
                  </div>
                  <div className="testimonial-content mt-20">
                    <p>
                      Lorem ipsum dolor sit amet, ectetur adipiscing elit.
                      Phasellus vel erat ces, commodo lectus eu, finibus diam. m
                      ipsum dolor sit amet, ectetur.
                    </p>
                   
                    <h5 className="testimonial-name mt-15">Negm</h5>
                    <span className="sub-title">Supervisor</span>
                    <div className="negmSocialC ">
                    <ul className="negmsocial social mt-25">
            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-github"></i></a></li>
              <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
            </ul>
                    </div>
                  </div>
                </div>{" "}
                {/* single-testimonial */}
              </div>{" "}
              {/*  testimonial active */}
            </div>
          </div>{" "}
          {/* row */}
        </div>{" "}
        {/* testimonial bg */}
      </div>{" "}
      {/* container */}
    </section>
  );
}

export default Ceo;

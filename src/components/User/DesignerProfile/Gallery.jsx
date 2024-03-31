import React from 'react'
import img from '../../assets/images/background-02.jpg';
function Gallery() {
	return (
		<>
			<div className="container">
				<div className="gallary-card">
					<div className="face face1">
						<div className="content">
							<img src={img} alt='gallary-img' />
							<h3>House Design</h3>
						</div>
					</div>
					<div className="face face2">
						<div className="content">
							<a href="#">Read More</a><br />
							<i className="fa fa-eye"></i>

						</div>
					</div>
				</div>
				<div className="gallary-card">
					<div className="face face1">
						<div className="content">
							<img src={img} />
							<h3>House Design</h3>
						</div>
					</div>
					<div className="face face2">
						<div className="content">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
							<a href="#">Read More</a>
						</div>
					</div>

				</div>
				<div className="gallary-card">
					<div className="face face1">
						<div className="content">
							<img src={img} />
							<h3>House Design</h3>
						</div>
					</div>
					<div className="face face2">
						<div className="content">
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>


							<a href="#">Read More</a>
						</div>
					</div>
				</div>
			</div>




		</>
	)
}

export default Gallery
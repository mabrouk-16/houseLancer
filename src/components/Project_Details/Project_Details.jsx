import Projects from "../Projects/Projects";
import styles from "./Project_Details.module.css";
import { useLocation, useParams } from "react-router-dom";
import user from "../../../public/images/man-300x300.png";
import AddOffer from "../../components/AddOffer/AddOfer";
import Offers from "../Offers/Offers";
import { useProjectDetailsQuery } from "../../services/api";
import { useEffect, useState } from "react";
import { useAddOfferMutation } from "../../services/offer";
import NewThree from "../threeModel/NewThree";
import ModelOverlay from "../threeModel/ModelOverlay";
import ThreeContainer from "../threeModel/ThreeContainer";
import ModelControls from "../threeModel/ModelControls";
import AddObjects from "../threeModel/AddObjects";
function Project_Details() {
  let total = 0;
  const userRole = JSON.parse(localStorage.getItem("userData")).role;
  const loc = useLocation();
  console.log(loc.state._id);
  const [edit, setEdit] = useState(false);
  const { data, isFetching } = useProjectDetailsQuery(loc.state._id);
  console.log(data);
  const [addOffer, { isLoading, isError, isSuccess }] = useAddOfferMutation();
  console.log(isLoading);
  console.log(isError);
  console.log(isSuccess);

  useEffect(() => {
    console.log(addOffer);
  }, [addOffer]);
  const projectdetails = data?.data; // Use optional chaining to prevent errors if data is undefined
  console.log(projectdetails);

  // Return loading indicator if data is fetching
  if (isFetching) {
    return (
      <div>
        <div id="loading-wrapper">
          <div id="loading-text">LOADING</div>
          <div id="loading-content"></div>
        </div>
      </div>
    );
  }

  // Return an error message if data is still undefined
  if (!projectdetails) {
    return <div>Error: Unable to fetch project details.</div>;
  }
  const difference = Math.round(
    Date.now() - new Date(projectdetails.createdAt).getTime()
  );
  let time;

  if (Math.abs(difference) < 1000 * 60 * 60 * 24 * 365) {
    // One day or more but less than one year, convert to days
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24)) + " days";
  } else {
    // One year or more, convert to years
    time =
      Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24 * 365)) + " years";
  }

  const prams = useParams();
  console.log(prams.id);

  return (
    <>
      <div className={` ${styles.project_d_bg}`}>
        <div className={` ${styles.project_d_layer}`}>
          <div className="container ">
            <div className="row">
              <div className={`m-auto  ${styles.title_add} text-white  mt-5 `}>
                <h4 className=" m-auto p-2">{projectdetails.title}</h4>
              </div>
              <div className="col lg-8">
                <div className={`mt-5 ${styles.description}`}>
                  <p className="ms-3 pt-3">description </p>
                  <span></span>
                  <p className="ms-3 py-3">{projectdetails.description}</p>
                </div>
                <div className={`mt-2 ${styles.description}`}>
                  <p className="ms-3 pt-3">skills </p>
                  <span></span>
                  <p className={`ms-3 py-3 ${styles.skills_Height}`}>
                    {projectdetails.skills.map((item, indx) => {
                      return (
                        <div
                          key={indx}
                          className={`btn  ms-2 me-2 mt-2 ${styles.project_skills}`}
                        >
                          <i className="fa-brands fa-unity"></i> {item}
                        </div>
                      );
                    })}
                  </p>
                </div>
                {/* three D */}

                {projectdetails.lines.length !== 0 && !edit && (
                  <div className={` ${styles.description}`}>
                    <p className="ms-3 pt-3">3D Design </p>
                    <span></span>
                    <div className={`py-3 ${styles.canva_section}`}>
                      <NewThree
                        showBtn={false}
                        projectLines={projectdetails.lines}
                      />
                    </div>
                    <div className="">
                      <button
                        onClick={() => setEdit(true)}
                        className="btn btn-primary w-auto mx-auto my-2 d-block"
                      >
                        edit project
                      </button>
                    </div>
                  </div>
                )}

                {/* ------- */}
              </div>

              <div className="col-lg-4">
                <div className={`mt-lg-5 ${styles.description}`}>
                  <p className="ms-3 pt-3">project card </p>
                  <span></span>
                  <div className={`${styles.card_content} container`}>
                    <div className="d-flex justify-content-between pt-2">
                      <p>Project status</p>
                      {projectdetails.status == "closed" ? (
                        <p className="bg-danger rounded-2 px-1 text-white ms-auto">
                          {projectdetails.status}
                        </p>
                      ) : (
                        <p className="bg-success rounded-2 px-1 text-white ms-auto">
                          {projectdetails.status}
                        </p>
                      )}
                    </div>
                    <div className="d-flex justify-content-between  ">
                      <p>Pate of publication</p>
                      <p className="ms-auto">since {time}</p>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p>Project budget</p>
                      <p className="">{projectdetails.expectedPrice}</p>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p>Duration</p>
                      <p className="">{projectdetails.expectedTime} Day</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Average Offer Price</p>
                      <div className="">
                        {projectdetails.offer.map((item) => {
                          total += item.price; // Increment total for each item
                          return null; // We don't want to render anything here yet
                        })}
                        <div>
                          {projectdetails.offer.length > 0
                            ? total / projectdetails.offer.length + " $"
                            : 0}
                        </div>{" "}
                        {/* Display the average after iterating through the array */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <p>Offers</p>
                      <p className="">{projectdetails.offer.length} offers</p>
                    </div>
                    <span className="my-2"></span>
                    <div className="">
                      <div className="d-flex align-content-center py-2">
                        <i className="fa-solid fa-square-check fs-5"></i>{" "}
                        <h6 className="ps-2"> stage of receiving offers</h6>
                      </div>
                      <h6 className="py-1 ps-4"> Implementation phase</h6>
                      <h6 className="py-1 ps-4"> Delivery stage</h6>
                    </div>
                    <div className=""></div>
                    <div className=""></div>
                    <span className="my-2"></span>
                    <div className=" ">
                      <p>Project Owner</p>
                      <div className="d-flex align-content-center">
                        <img
                          className={`${styles.userImage} me-4`}
                          src={
                            "http://localhost:3000/" +
                            projectdetails.createdBy.image
                          }
                          alt={projectdetails.userName}
                        />
                        <div className="">
                          <h6>{projectdetails.createdBy.userName}</h6>
                          <p>
                            <i className="fa-solid fa-briefcase me-2"></i> 3d
                            designer
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.addOffer1} `}>
              <div className={`row mt-2`}>
                <div className="col-lg-8">
                  {userRole == "Designer" ? (
                    <div className={`${styles.addOffer} `}>
                      <p className="ps-3 pt-3">Add Offer Now</p>
                      <span></span>
                      <div className="ps-3 py-3">
                        <AddOffer data={projectdetails._id} />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={`my-3 ${styles.All_Offers}`}>
                    <p className="ps-3 pt-3">All Project Offers</p>
                    <span></span>
                    <div>
                      {/* {
                                        projectdetails.offer.map((item) => {
                                            return <div key={item._id} > <Offer data={item.createdBy} /></div>
                                        })
                                    } */}
                      <Offers projectId={projectdetails._id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {edit && (
        <>
          <ModelOverlay>
            <div>
              <button
                className="my-2 btn btn-block fs-2"
                onClick={() => setEdit(false)}
              >
                Back To Project
              </button>
            </div>
            <ModelControls />
            <section className="three-section">
              <AddObjects />
              <div className={`${styles.canva_overlay}`}>
                <NewThree showBtn={true} projectLines={projectdetails.lines} />
              </div>
            </section>
          </ModelOverlay>
        </>
      )}
    </>
  );
}

export default Project_Details;

import { useNavigate } from "react-router-dom";
import styles from "./Project.module.css";

function Project({ data }) {
  const nav = useNavigate();

  function goToProjectDetails() {
    nav(`/projectDetails/${data._id}`, { state: data });
  }

  function addOffer() {
    nav(`/projectDetails/${data._id}`, { state: data });
  }

  function getTitle(str) {
    let title = str.split(" ", 5);
    return title.join(" ");
  }

  function getDesc(str) {
    let title = str.split(" ", 15);
    return title.join(" ");
  }

  // Calculate the time difference directly inside the component
  const difference = Math.round(Date.now() - new Date(data.createdAt).getTime());
  let time;

  if (Math.abs(difference) < 1000 * 60 * 60) {
    time = Math.round(Math.abs(difference) / (1000 * 60)) + " minutes";
  } else if (Math.abs(difference) < 1000 * 60 * 60 * 24) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60)) + " hours";
  } else if (Math.abs(difference) < 1000 * 60 * 60 * 24 * 365) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24)) + " days";
  } else {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24 * 365)) + " years";
  }

  return (
    <div className={`container ${styles.contain}`}>
      <div className={`${styles.showbox}`}>
        <div className={`${styles.content}`}>
          <div className="d-flex justify-content-between">
            <h4 onClick={goToProjectDetails} className={`${styles.projectTitle}`}>
              {getTitle(data?.title)}
            </h4>
            <div className={`${styles.title}`}>
              <button onClick={addOffer} className={`${styles.addOffer}`}>
                Add Offer{" "}
              </button>
            </div>
          </div>
          <p>
            <img
              className={`${styles.userImage} me-2`}
              src={"http://localhost:3000/" + data?.createdBy?.image}
              alt=""
            />
            {data?.createdBy?.firstName}
            <i className="fa-regular fa-clock  mx-2"></i>
            {time}
            <i className="fa-solid fa-marker mx-2 "></i>
            {data.offer?.length} offers
          </p>
          <p>{getDesc(data?.description)}</p>
        </div>
      </div>
    </div>
  );
}

export default Project;

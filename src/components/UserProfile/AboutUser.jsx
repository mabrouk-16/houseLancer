import { useEffect } from "react";
import { useUserProfileIdQuery, useUserProfileQuery } from "../../services/user";
import styles from './UserProfile.module.css'

function AboutUser() {
    const { data, error, isLoading ,refetch} = useUserProfileIdQuery();
    const rate = 0
    // Log data in console
    console.log(data)
    useEffect(() => {
        if (data) {
            console.log("about user Data:", data.data);
            refetch()
        }
        if (error) {
            console.error("Error fetching user profile:", error);
        }
    }, [data, error]);

    if (isLoading) return <div id="loading-wrapper">
        <div id="loading-text">LOADING</div>
        <div id="loading-content"></div>
    </div>;
    const date = new Date(data?.data.createdAt);
    const options = { day: '2-digit', month: '2-digit',year:'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
    console.log(formattedDate)

    return (
        <>
            <div className="">
                <div className="row justify-content-between">
                    <div className=" col-md-6 me-5">
                        <div className={` rounded-3  ${styles.about_user}`}>
                            <h5 className="ps-3 pt-3 mb-0">About Me</h5>
                            <span className={`${styles.span}`}></span>
                            <p className="text-dark pe-5 p-3">{data?.data.about}</p>
                        </div>
                        <div className={` rounded-3 ${styles.about_user}`}>
                            <h5 className="ps-3 pt-3 mb-0">Skills</h5>
                            <span className={`${styles.span}`}></span>
                            <p className="py-3">{data?.data?.skills?.map((item, indx) => {
                                return <div key={indx} className={`btn  ms-2 me-2 mt-2 ${styles.project_skills}`}><i className="fa-brands fa-unity"></i> {item}</div>
                            })}</p>
                        </div>
                    </div>
                    <div className=" col-md-5   ">
                        <div className={` rounded-3  ${styles.about_user}`}>
                            <h5 className="ps-3 pt-3 mb-0">Statistics</h5>
                            <span className={`${styles.span}`}></span>
                            <div className="row pe-5 pt-3 ps-3 d-flex justify-content-between align-items-center">
                                <h6 className="text-dark col-8 ">Ratings</h6>
                                <p className="text-dark col-4 ps-0">
                                    <i className={`fa-solid fa-star ${data?.data?.rate >= 1 ? 'text-warning' : 'text-muted'}`}></i>
                                    <i className={`fa-solid fa-star ${data?.data?.rate >= 2 ? 'text-warning' : 'text-muted'}`}></i>
                                    <i className={`fa-solid fa-star ${data?.data?.rate >= 3 ? 'text-warning' : 'text-muted'}`}></i>
                                    <i className={`fa-solid fa-star ${data?.data?.rate >= 4 ? 'text-warning' : 'text-muted'}`}></i>
                                    <i className={`fa-solid fa-star me-2 ${data?.data?.rate >= 5 ? 'text-warning' : 'text-muted'}`}></i>
                                    ({data?.data?.rate || rate})
                                </p>
                            </div>
                            <div className="row pe-5 ps-3 d-flex justify-content-between align-items-center">
                                <h6 className="text-dark col-8">Project completion rate</h6>
                                <h6 className="col-4 text-dark bg-danger rounded-1 px-1">Not Calculated</h6>
                            </div>
                            <div className="row pe-5 ps-3 d-flex justify-content-between align-items-center">
                                <h6 className="text-dark col-8">Reemployment rate</h6>
                                <h6 className="col-4  text-dark bg-danger rounded-1 px-1">Not Calculated</h6>
                            </div>
                            <div className="row pe-5 ps-3 d-flex justify-content-between align-items-center">
                               <h6 className="text-dark col-8">On time delivery rate</h6>
                                <h6 className="col-4 text-dark bg-danger rounded-1 px-1">Not Calculated</h6>
                            </div>
                            <div className="row pe-5 ps-3 d-flex justify-content-between align-items-center">
                                <h6 className="text-dark col-8">Response average</h6>
                                <h6 className="col-4 ps-0 text-dark ">30 minutes</h6>
                            </div>
                            <span className={`${styles.span}`}></span>
                            <div className="row pe-5 ps-3 d-flex justify-content-between align-items-center">
                                <h6 className="text-dark col-8">Registration date</h6>
                                <h6 className="col-4 ps-0  py-2 text-dark ">{formattedDate}</h6>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUser
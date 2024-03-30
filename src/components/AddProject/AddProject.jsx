import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAddProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom";
import Projects from "../Projects/Projects";
import styles from "./AddProject.module.css";
import ThreeContainer from "../threeModel/ThreeContainer";
import ModelOverlay from "../threeModel/ModelOverlay";
import CanvasDrawing from "../threeModel/CanvasDrawing";
import NewThree from "../threeModel/NewThree";
import { useSelector } from "react-redux";

function AddProject() {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [skills, setSkills] = useState([
    "Unity",
    "Blender",
    "React",
    "Node.js",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
  ]); // Initial options for skills
  const [selectedSkills, setSelectedSkills] = useState([]); // State to hold selected skills
  const [addProject, { isLoading, isError }] = useAddProjectMutation();
  const lines = useSelector((state) => state.canvaReducer.lines);

  const onSubmit = async (data) => {
    try {
      data.skills = selectedSkills;
      data.lines = [...lines]
      const response = await addProject(data);
      console.log(data);
      console.log("Project added successfully:", response);
      reset();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSkills([...selectedSkills, value]);
    } else {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== value));
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("title", { required: true, minLength: 25 })}
              className="form-control p-2"
              placeholder="inter project realated title"
            />
            {errors.title && (
              <span className="text-danger ">Title must be at least 25 characters long</span>
            )}
          </div>
          <div className="form-group">
            <textarea
              {...register("description", { required: true, minLength: 50 })}
              className={` form-control my-3 ${styles.textArea}`}
              placeholder="Description"
            />
            {errors.description && (
              <span className="text-danger ">description must be at least 50 characters long</span>
            )}
          </div>
          <div className="form-group">
            <select {...register("expectedPrice", { required: true })} className="form-control p-2">
              <option value="">Select Expected Price</option>
              <option value="25 - 50$">25 - 50$</option>
              <option value="50 - 100$">50 - 100$</option>
              <option value="100 - 250$">100 - 250$</option>
              <option value="250 - 500$">250 - 500$</option>
              <option value="500 - 1000$">500 - 1000$</option>
              <option value="1000 - 2500$">1000 - 2500$</option>
              <option value="2500 - 5000$">2500 - 5000$</option>
              <option value="5000 - 10000$">5000 - 10000$</option>
            </select>
            {errors.expectedPrice && (
              <span className="text-danger">Please select an expected price range</span>
            )}
          </div>
          <div className="form-group">
            <input
              {...register("expectedTime", { required: true, pattern: /^[0-9]+$/ })}
              className="form-control p-2 my-3"
              type="number"
              placeholder="Expected Time"
            />
            {errors.expectedTime && (
              <span className="text-danger">Expected Time is required and must be a number</span>
            )}
          </div>
          <div className="form-group">
            <select {...register("category", { required: true })} className="form-control p-2">
              <option value="">Select Category</option>
              <option value="flats">Flats</option>
              <option value="hotels">Hotels</option>
              <option value="offices">Offices</option>
              <option value="companies">Companies</option>
              <option value="restaurants">Restaurants</option>
            </select>
            {errors.category && <span className="text-danger">Please select a category</span>}
          </div>
          <div className="form-group d-flex flex-wrap my-3">
            {skills.map((skill, index) => (
              <div key={index} className="form-check ">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`checkbox-${index}`}
                  value={skill}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label me-2" htmlFor={`checkbox-${index}`}>
                  {skill}
                </label>
              </div>
            ))}
          </div>
          {/* button  */}
          <button
            type="button"
            onClick={() => {
              // nav("three");
              setShow(true);
            }}
            style={{ backgroundColor: "#c59a5a", border: "unset" }}
            className={` rounded-5 mb-3 text-white p-1 w-100`}
          >
            Imagine Your Design
          </button>
          <button
            type="submit"
            style={{ backgroundColor: "#c59a5a", border: "unset" }}
            className={` rounded-5 mb-3 text-white p-1 w-100`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Project"}
          </button>
        </form>
        {isError && (
          <div className="alert alert-danger mt-3" role="alert">
            Error adding project. Please try again.
          </div>
        )}
      </div>
      {show && (
        <ModelOverlay>
          <button
            type="button"
            onClick={() => {
              // nav("three");
              setShow(false);
            }}
            style={{ backgroundColor: "#c59a5a", border: "unset" }}
            className={` rounded-5 mb-3 text-white p-1 w-100`}
          >
            Back to project
          </button>
          {/* <div
            className={styles.overlay}
            style={{ width: "100%", height: "100vh", position: "absolute", left: "0", top: "0" }}
          > */}
          <CanvasDrawing />
          {/* <ThreeContainer /> */}
          {/* </div> */}
        </ModelOverlay>
      )}
    </>
  );
}

export default AddProject;

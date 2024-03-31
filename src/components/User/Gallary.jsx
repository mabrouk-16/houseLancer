import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { addProject } from '../../Redux/Slices/projectSlice';
import './User.scss'

function Gallary() {

	const loc = useLocation();
	console.log(loc.state);
	const dispatch = useDispatch();
	const [projectData, setProjectData] = useState({
	  projectName: '',
	  description: '',
	  category: '',
	  
	});
	const [inputs, setInputs] = useState(['']);
  
	const handleAddInput = () => {
	  setInputs([...inputs, '']);
	};
  
	const handleInputChange = (index, value) => {
	  const newInputs = [...inputs];
	  newInputs[index] = value;
	  setInputs(newInputs);
	};
	const handleRemoveInput = (index) => {
	  const newInputs = [...inputs];
	  newInputs.splice(index, 1);
	  setInputs(newInputs);
	};
	const handleChange = (e) => {
	  setProjectData({ ...projectData, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
	  e.preventDefault();
	  dispatch(addProject(projectData));
	 
	};

  return (

 <>
<div className='container'>
      <div className='gallarytitle'>  
        <h2>Add Project</h2>
        <button className=' gallary-explain'>How to add a project</button>
        </div>
      
        <div className='addGallaryBox'>
        <form className='gallary-form'  method='post' onSubmit={handleSubmit}>
           <div>
          <label htmlFor="projectName">Project Name</label>
          <em className='clr-red'>*</em>
          <input
            type="text"
            id="projectName"
            name="projectName"
            className='form-control' 
            required
            placeholder='add project name' 
            maxLength='60'
            value={projectData.projectName}
            onChange={handleChange}
          />
        </div>
		<div>
          <label htmlFor="category">Category</label>
          <em className='clr-red'>*</em>
          <input
            type="text"
            id="category"
            className='form-control'  
            name="category"
            value={projectData.category}
            onChange={handleChange}
          />
        </div>
            <div >
            <label htmlFor='description'>Project Description</label>
            <em className='clr-red'>*</em>
            <textarea
            id="description"
            name="description"
            className='form-control'
            required placeholder='Enter details and description of the project and specify the tasks to be completed'
            value={projectData.description}
            onChange={handleChange}
          ></textarea>
           </div>
         
            <div >
              <label htmlFor='upload'>Explanatory files</label>
              <em className='clr-red'>*</em>
              <div className='upload form-control'>
           
              <button type='button'  className='btn btn-outline-secondary'  value='addfiles' id='upload' ><i className="fa-solid fa-upload"></i> add image or vedio</button>
               <p>Upload Files</p>
            </div>
            </div>
            <div>
            <label>Project link</label>
            <em className='clr-red'>*</em>
            <input
            type="text"
            id="expectedbudget"
            className='form-control' 
            required
             placeholder='add expected budget' 
            name="expectedbudget"
            value={projectData.budget}
            onChange={handleChange}
          />
            </div>

            <div>
            <label>Completion date</label>
            <em className='clr-red'>*</em>
            <input
            type="date"
            id="deliveryduration"
            className='form-control'  
            required 
            placeholder='add duration'
            name="deliveryduration"
            value={projectData.deliveryduration}
            onChange={handleChange}
          />
            </div>
          



            <div className="addfield">
             <label className='me-4'>Add New Field</label>
             {inputs.map((input, index) => (
            <div key={index}>
             <input
            type="text"
            className='newinput '
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
             />
              <button type="button"  onClick={() => handleRemoveInput(index)} className="btn-close close" aria-label="Close"></button>
              {/* <button className='addbtn' onClick={() => handleRemoveInput(index)}><i className="fa-solid fa-xmark"></i></button> */}
           </div>
            ))}
      <button className='addbtn newfield' onClick={handleAddInput}>Add Question</button>
    </div>
           
           
            <div className='submitbtn'>
            <button type='submit' className='addbtn btn  me-2 ' value='save'>Save</button>
            <button type='submit' className='addbtn btn' value='draft'>Save Draft</button>
            </div>
            </form>
            
            <div className='explaination'>
              <div  className='advices'>
                <h6>Start building your gallary</h6>
                <p>Add your previous work that you have implemented. Adding work to your profile helps project owners know your skills and increases your chances of being hired.</p>
              </div>
              <div  className='advices'>
                <h6>Your works demonstrate your skills and experience</h6>
                <p>Add distinctive, high-quality works and constantly update them with the new techniques and skills you acquire.
                </p>
              </div>
      
              </div>
       
        </div>
       
        </div>
        


</> 
  )
}

export default Gallary
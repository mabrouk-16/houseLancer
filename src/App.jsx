import { Navigate, RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Notfound from "./components/Notfound/Notfound";
import About from "./components/About/About";
import ThreeContainer from "./components/ThreeContainer";
import Projects from "./components/Projects/Projects";
import FindDesigner from "./components/FindDesigner/FindDesigner";
import ProjectsGallery from "./components/ProjectsGallery/ProjectsGallery";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import Contact from "./components/Contact/Contact";
import Project_Details from "./components/Project_Details/Project_Details";
import AddProject from "./components/AddProject/AddProject";

function App() {
  const [userData,setUserData]=useState(null);

useEffect(() =>{
   if (localStorage.getItem('token')){
    saveUser()
   }

},[]);
useEffect(() => {
  // Function to check token expiration
  const checkTokenExpiration = () => {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Check if token exists
      if (token) {
          // Parse token to extract expiration time
          const tokenData = JSON.parse(atob(token.split('.')[1])); // Decoding base64 token
          const expirationTime = tokenData.exp * 1000; // Convert expiration time to milliseconds

          // Get current time
          const currentTime = new Date().getTime();

          // Check if token has expired
          if (currentTime > expirationTime) {
              // Token has expired, remove it from local storage
              localStorage.removeItem('token');
              localStorage.removeItem('userData');
              console.log('Expired token removed.');
              Navigate('/login');
          } else {
              console.log('Token is still valid.');
          }
      } else {
          console.log('Token not found in local storage.');
      }
  };

  // Call the function to check token expiration
  checkTokenExpiration();
}, []);
function saveUser(){
    let encodeToken=localStorage.getItem('token');
    if (encodeToken) {
      let decoded= jwtDecode(encodeToken)
      console.log(decoded);
      setUserData(decoded);
    }
}

  let routers = createBrowserRouter([
    {
      path: '', element: <Layout userData={userData} setUserData={setUserData} />, children: [
        { path: 'about', element: <About />, children: [] },
        { index: true, element: <Home /> },
        { path: 'create', element: <ThreeContainer /> },
        { path: 'projects', element: <Projects /> },
        { path: 'designer', element: <FindDesigner /> },
        { path: 'gallery', element: <ProjectsGallery /> },
        { path: 'contact', element: <Contact /> },
        { path: 'login', element: <Login saveUser={saveUser} /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Notfound /> },
        { path:"/projectdetails/:id", element:<Project_Details /> },
        { path:"/addproject", element:<AddProject /> }
      ]
    }
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
 
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Notfound from "./components/Notfound/Notfound";
import AboutPage from "./components/AboutPage/AboutPage";
import Projects from "./components/Projects/Projects";
import FindDesigner from "./components/FindDesigner/FindDesigner";
import ProjectsGallery from "./components/ProjectsGallery/ProjectsGallery";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Contact from "./components/Contact/Contact";
import Project_Details from "./components/Project_Details/Project_Details";
import AddProject from "./components/AddProject/AddProject";
import UserProfile from "./components/User/UserProfile";
import General from "./components/User/General";
import Gallary from "./components/User/Gallary";
import Connection from "./components/User/Connection";
import Info from "./components/User/Info";
import ChangePass from "./components/User/ChangePass";
import UserData from './components/UserProfile/UserProfile'
import AboutUser from "./components/UserProfile/AboutUser";
import DesignerGallery from "./components/UserProfile/DesignerGallery";
import DesignerOffers from "./components/UserProfile/DesignerOffers";
import UserDProjects from "./components/UserProfile/UserDProjects";
import Home1 from "./components/Home1/Home1";
import UserProject_Details from "./components/UserProject_Details/UserProject_Details";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveUser();
    }
  }, []);


  function saveUser() {
    let encodeToken = localStorage.getItem('token');
    if (encodeToken) {
      let decoded = jwtDecode(encodeToken);
      console.log(decoded);
      setUserData(decoded);
    }
  }

  const isUserLoggedIn = !!localStorage.getItem('token');
  console.log(isUserLoggedIn)

  let routers = createBrowserRouter([
    {
      path: '', element: <Layout userData={userData} setUserData={setUserData} />, children: [
        { path: 'about', element: <AboutPage /> },
        { index: true, element: <Home1 /> },
        // { path: 'create', element: <ThreeContainer /> },
        { path: 'projects', element: <Projects /> },
        {
          path: 'designer', element: <UserData />, children:
            [
              { index: 'true', element: <AboutUser /> },
              { path: 'aboutUser', element: <AboutUser /> },
              { path: 'userProjects', element: <UserDProjects /> },
              { path: 'designerGallery', element: <DesignerGallery /> },
              { path: 'designerOffers', element: <DesignerOffers /> },
            ]
        },
        { path: 'gallery', element: <ProjectsGallery /> },
        { path: 'contact', element: <Contact /> },
        { path: 'login', element: isUserLoggedIn ? <Navigate to="/" /> : <Login saveUser={saveUser} /> },
        { path: 'register', element: isUserLoggedIn ? <Navigate to="/" /> : <Register /> },
        { path: '*', element: <Notfound /> },
        { path: "/projectdetails/:id", element: <Project_Details /> },
        { path: "/userprojectdetails/:id", element: <UserProject_Details /> },
        { path: "/addproject", element: <AddProject /> },
        {
          path: "/profile", element: isUserLoggedIn ?
            <UserProfile /> :
            <Navigate to="/login" />, children: [
              { index: 'true', element: <General  /> },
              { path: 'general', element: <General  /> },
              { path: 'gallary', element: <Gallary /> },
              { path: 'connection', element: <Connection /> },
              { path: 'info', element: <Info /> },
              { path: 'changepass', element: <ChangePass /> },
            ]
        }
      ]
    }
  ]);
  
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;

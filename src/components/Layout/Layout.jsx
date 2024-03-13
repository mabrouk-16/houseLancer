import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

function Layout({ userData, setUserData }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  // Log out function

  async function logOut() {
    try {
        const token = localStorage.getItem("token");
        await axios.post('https://iti-final-be.onrender.com/auth/logout', {}, {
            headers: {
                Authorization: `FINALITI__${token}`
            }
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUserData(null)
        // Redirect the user to the logout page or any other desired page
        nav('/login');
    } catch (error) {
        console.error(error);
        // Handle error if logout request fails
    }
}
useEffect(() => {
  // Simulate loading time with setTimeout
  const timeout = setTimeout(() => {
    setLoading(false);
  }, 2000); // Change the timeout duration as needed

  // Clean up timeout on component unmount
  return () => clearTimeout(timeout);
}, []);

  return (
    <>
    {loading?(<div id="loading-wrapper">
          <div id="loading-text">LOADING</div>
          <div id="loading-content"></div>
        </div>):(
      <>
      <Navbar userData={userData} logOut={logOut} />
      <Outlet />
      </>
      )}
    </>
  );
}

export default Layout;

import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

function Layout({ userData, setUserData }) {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  // Log out function
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
                nav('/login');
            } else {
                console.log('Token is still valid.');
            }
        } else {
            console.log('Token not found in local storage.');
            nav('/login');
        }
    };
  
    // Call the function to check token expiration
    checkTokenExpiration();
  }, []);

  async function logOut() {
    try {
        const token = localStorage.getItem("token");
        await axios.post('http://localhost:3000/auth/logout', {}, {
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
      <Toaster/>
      
      </>
      )}
    </>
  );
}

export default Layout;

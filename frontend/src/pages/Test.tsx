// import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BACKEND_URL } from "./Login";
// import { Location } from "react-router-dom";

export default function Test(){
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');

  useEffect(() => {
    console.log('Login component mounted, verifying auth');
    console.log(localStorage.getItem('token'));
    const verify = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}auth/verify-auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'  // Add this header
          },
          body: JSON.stringify({
            "token": localStorage.getItem('token')
          })
        });
        
        if (response.ok) {
          const userData = await response.json();
          setIsVerified(true);
          setUser(userData.user.username);
          localStorage.setItem('isVerified', 'true');
        } else {
          setIsVerified(false);
          localStorage.removeItem('isVerified');
          // Remove the redirect here and let the component handle it
          // window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
        setIsVerified(false);
        localStorage.removeItem('isVerified');
      } finally {
        setIsLoading(false);
      }
    };
    
    verify();
  }, []); 


  const logout = async () => {
    try{
      await fetch(`${BACKEND_URL}auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      localStorage.removeItem('isVerified');
      setIsVerified(false);
      document.cookie = "token=;"
    } catch(error){
      console.error(error);
    }
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isVerified) {
    // console.log('verified');
    return (
      <div className="h-screen w-screen">
        <div>Logged in as: {user}</div>
        <button className="hover:cursor-pointer" onClick={logout}>Logout</button>
      </div>
    );
  } else {
    // console.log('not verified');
    return <Navigate to="/" />;
  }
}

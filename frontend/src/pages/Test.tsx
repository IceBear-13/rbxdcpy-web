import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Location } from "react-router-dom";

export default function Test(){
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async() => {
      if(sessionStorage.getItem('isVerified') === 'true'){
        setIsVerified(true);
      } 
      setIsLoading(false);
    };
    
    verify();
  }, []);

  const logout = async () => {
    try{
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      sessionStorage.removeItem('isVerified');
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
        <div>Logged in as:</div>
        <button className="hover:cursor-pointer" onClick={logout}>Logout</button>
      </div>
    );
  } else {
    // console.log('not verified');
    return <Navigate to="/" />;
  }
}
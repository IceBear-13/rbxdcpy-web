import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Location } from "react-router-dom";

export default function Test(){
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');

  useEffect(()=>{
    console.log('Login component mounted, verifying auth');
    const verify = async () => {
      try{
        const response = await fetch("http://localhost:3000/auth/verify-auth", {credentials: 'include'});
        if(response.ok){
          setIsVerified(true);
          const userData = await response.json();
          setUser(userData.user.username);
          sessionStorage.setItem('isVerified', 'true');
          setIsLoading(false);
        } else{
          window.location.href = "/";
        }
      } catch(error){
        console.error(error);
        setIsVerified(false);
      }
    };
    verify();
  }, [])


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
        <div>Logged in as: {user}</div>
        <button className="hover:cursor-pointer" onClick={logout}>Logout</button>
      </div>
    );
  } else {
    // console.log('not verified');
    return <Navigate to="/" />;
  }
}

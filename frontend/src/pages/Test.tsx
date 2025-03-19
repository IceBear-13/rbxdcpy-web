import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function Test(){
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const verify = async() => {
      try {
        setIsLoading(true);
        const verified = await fetch('http://localhost:3000/auth/verify-auth', {credentials: 'include'});
        const result = await verified.json();
        setIsVerified(result.authenticated);
      } catch(error) {
        console.error(error);
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    verify();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isVerified) {
    console.log('verified');
    return (
      <div className="h-screen w-screen">
        <div>Logged in as:</div>
      </div>
    );
  } else {
    console.log('not verified');
    return <Navigate to="/" />;
  }
}
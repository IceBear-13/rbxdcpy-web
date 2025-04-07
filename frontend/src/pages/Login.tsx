import { useEffect, useState } from "react";
import Textbox from "../components/Textbox";
import Passwordbox from "../components/Password";
import Buttons from "../components/Buttons";
import { Navigate, useNavigate } from "react-router-dom";

export const BACKEND_URL = 'https://rbxdcpy-api.vercel.app/';

export default function Login() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const verify = async () => {
      console.log('verify called once')
      try {
        const response = await fetch(`${BACKEND_URL}auth/verify-auth`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: localStorage.getItem('token')
          }),
          credentials: 'include'
        });
        
        if(response.ok) {
          setIsVerified(true);
          localStorage.setItem('isVerified', 'true');
        } else {
          setIsVerified(false);
          localStorage.removeItem('isVerified');
        }
      } catch(error) {
        console.error(error);
        setIsVerified(false);
        localStorage.removeItem('isVerified');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Check localStorage, not sessionStorage
    if(localStorage.getItem('isVerified') === 'true') {
      verify();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleSignin = async () => {
    const username = (document.getElementById('uNameLogin') as HTMLInputElement)?.value;
    const password = (document.getElementById('pwdLogin') as HTMLInputElement)?.value;
    
    try {
      const response = await fetch(`${BACKEND_URL}auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: username,
          password: password
        })
      });
      
      if(response.ok) {
        const userData = await response.json();
        localStorage.setItem('token', userData.token);
        localStorage.setItem('isVerified', 'true');
        localStorage.setItem('userID', userData.user.userId);
        setIsVerified(true);
        navigate('/test'); // Use React Router navigation instead of window.location
      } else {
        setWrongCredentials(true);
        alert('Incorrect username or password');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      handleSignin();
    }
  }

  if(isLoading) {
    return <div className="w-full h-screen flex justify-center items-center">Loading...</div>;
  }

  if(isVerified) {
    return <Navigate to="/test" />;
  }

  return (
    <div className="w-full h-screen flex py-[5%] px-[10%]">
      <div className="w-full h-full m-auto rounded-lg flex justify-between space-x-10 p-5 border border-gray-200 shadow-xl">
        <div className="w-[45%] lg:flex items-center justify-center hidden">
          <img
            src="thisartwork.jpg"
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition duration-300"
          />
        </div>
        <div className="px-2 w-[45%] flex flex-col flex-grow overflow-auto">
          <h1 className="text-lg font-bold mb-4 mt-1">Sign in</h1>
          {wrongCredentials && <h3 className="text-red-500 text-[20px]">Trying to be someone else? Lock in.</h3>}
          <Textbox
            name="uNameLogin"
            id="uNameLogin"
            labelContent="Username or email"
            placeholder="Enter your username"
            onKeyDown={handleKeyPress}
          />
          <Passwordbox id="pwdLogin" name="pwdLogin" labelContent="Password" onKeyDown={handleKeyPress} />
          <div className="mb-5">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" className="ml-2 text-[18px]">
              Remember me
            </label>
          </div>
          <Buttons buttonText="Sign in" buttonsId="signin" buttonName="signin" onClickFunction={handleSignin}/>

          <div className="mt-auto text-[18px]">
            <a className="underline hover:text-gray-600 hover:cursor-pointer transition duration-300" href="/signup">
              Create an account
            </a>
            <div className="flex space-x-1">
              <ul className="list-none flex items-center space-x-2">
                <div className="h-full flex items-center">
                  Alternatively sign in with:
                </div>
                <li>
                  <a className="p-1 border border-gray-300 rounded-lg h-full flex items-center hover:bg-gray-300 hover:cursor-pointer transition duration-300 hover:scale-105" href={`${BACKEND_URL}auth/discord`}>
                    <img
                      src="discord-logo-512x512.svg"
                      className="size-[30px]"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
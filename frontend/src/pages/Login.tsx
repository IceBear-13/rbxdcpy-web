import React from "react";
import Textbox from "../components/Textbox";
import Passwordbox from "../components/Password";

export default function Login() {
  return (
    <div className="w-full h-screen flex py-[5%] px-[10%]">
      <div className="w-full h-full m-auto rounded-lg flex justify-between space-x-10 p-5 border border-gray-200 shadow-xl">
        <div className="w-[45%] lg:flex items-center justify-center hidden">
          <img src="thisartwork.jpg" className="w-full h-full object-cover rounded-lg" />
        </div>
        <form className="px-2 w-[45%] flex flex-col flex-grow overflow-auto">
          <h1 className="text-lg font-bold mb-4 mt-1">Sign in</h1> 
          <Textbox name="uNameLogin" id="uNameLogin" labelContent="Username or email"/>
          <Passwordbox id="pwdLogin" name="pwdLogin" labelContent="Password"/>
          <div className="mb-5">
            <input type="checkbox" id="rememberMe" name="rememberMe"  />
            <label htmlFor="rememberMe" className="ml-2 text-[18px]">Remember me</label>
          </div>
          <input
            type="submit"
            value="Sign in"
            className="px-4 py-1 bg-blue-700 text-white rounded-lg hover:bg-blue-800 mt-3 w-[150px] hover:cursor-pointer"
          />

          <div className="mt-auto text-[18px]">
            <a className="underline hover:text-white hover:cursor-pointer transition duration-300">Create an account</a>
            <div className="flex space-x-1">
              
              <div>Alternatively sign in with:</div>
                <ul className="list-none flex space-x-1">
                  <li><a>discord logo</a></li> 
                  <li><a>Google logo</a></li>
                </ul>
              </div>
            
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";

export default function Login() {
  return (
    <div className="w-full h-screen flex py-[5%] px-[10%]">
      <div className="w-full h-full bg-blue-500 m-auto rounded-lg flex justify-between space-x-10 p-5">
        <div className="w-[45%] flex items-center justify-center">
          <img src="thisartwork.jpg" className="w-full h-full object-cover rounded-lg" />
        </div>
        <form className="px-2 w-[45%] flex flex-col flex-grow">
          <label htmlFor="uName" className="text-[18px]">Username</label>
          <input
            type="text"
            name="uName"
            id="uName"
            className="w-full border-b-1 mb-3"
          />
          <label htmlFor="password" className="text-[18px]">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full border-b-1 mb-3"
          />
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
            <div>Alternatively sign in with:</div>
            <div className="flex">

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

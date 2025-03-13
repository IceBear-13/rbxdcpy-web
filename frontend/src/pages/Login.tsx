import React from "react";

export default function Login(){
  return(
    <div className="w-full h-screen flex">
      <div className="w-[400px] h-[70%] bg-blue-500 m-auto rounded-lg">
        <h2 className="text-[20px] text-center mt-2">Login</h2>
        <form className="px-2">
          <label htmlFor="uName">Username</label>
          <input type="text" name="uName" id="uName" className="border border-black rounded-lg w-full mb-3"/>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className="border border-black rounded-lg w-full" />
          
        </form>
      </div>
    </div>

  )
}

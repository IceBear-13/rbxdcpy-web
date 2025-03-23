import React from "react";
import Textbox from "../components/Textbox";
import Passwordbox from "../components/Password";
import Buttons from "../components/Buttons";

export default function Signup() {
  return (
    <div className="w-full h-screen flex py-[5%] px-[10%]">
      <div className="w-full h-full m-auto rounded-lg flex justify-between space-x-10 p-5 border border-gray-200 shadow-xl">
        <div className="w-[45%] lg:flex items-center justify-center hidden">
          <img src="thisartwork.jpg" className="w-full h-full object-cover rounded-lg hover:scale-102 transform duration-300" />
        </div>
        <div className="px-2 w-[45%] flex flex-col flex-grow h-full overflow-scroll">
          <h1 className="mb-4 mt-1 text-md font-bold">Create a new account</h1>
          <Textbox name="emailSignup" id="emailSignup" labelContent="Email" placeholder="Enter your email" />
          <Textbox name="uName" id="uName" labelContent="Username" placeholder="Enter your username"/>
          <Passwordbox id="pwdSignup" name="pwdSignup" labelContent="Password" placeholder="Enter your password"/>
          <Buttons buttonText="Sign up" buttonName="signup" buttonsId="signup"/>
        </div>
      </div>
    </div>
  );
}

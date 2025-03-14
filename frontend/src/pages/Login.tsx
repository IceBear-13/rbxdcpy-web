import React from "react";
import Textbox from "../components/Textbox";
import Passwordbox from "../components/Password";
import Buttons from "../components/Buttons";

export default function Login() {
  return (
    <div className="w-full h-screen flex py-[5%] px-[10%]">
      <div className="w-full h-full m-auto rounded-lg flex justify-between space-x-10 p-5 border border-gray-200 shadow-xl">
        <div className="w-[45%] lg:flex items-center justify-center hidden">
          <img
            src="thisartwork.jpg"
            className="w-full h-full object-cover rounded-lg hover:scale-102 transition duration-300"
          />
        </div>
        <form className="px-2 w-[45%] flex flex-col flex-grow overflow-auto">
          <h1 className="text-lg font-bold mb-4 mt-1">Sign in</h1>
          <Textbox
            name="uNameLogin"
            id="uNameLogin"
            labelContent="Username or email"
          />
          <Passwordbox id="pwdLogin" name="pwdLogin" labelContent="Password" />
          <div className="mb-5">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" className="ml-2 text-[18px]">
              Remember me
            </label>
          </div>
          <Buttons buttonText="Sign in" buttonsId="signin" buttonName="signin"/>

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
                  <button className="p-1 border border-gray-300 rounded-lg h-full flex items-center hover:bg-gray-300 hover:cursor-pointer transition duration-300 hover:scale-105">
                    <img
                      src="discord-logo-512x512.svg"
                      className="size-[30px]"
                    />
                  </button>
                </li>
                <li>
                  <button className="p-1 border border-gray-300 rounded-lg h-full flex items-center hover:bg-gray-300 hover:cursor-pointer transition duration-300 hover:scale-105">
                      <img
                        src="google_logo.svg"
                        className="size-[30px]"
                      />
                    </button>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

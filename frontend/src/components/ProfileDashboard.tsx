// import { useState } from "react";
import Textbox from "./Textbox";
import Buttons from "./Buttons";

export const ProfileConfig = () => {

  return(
    <div className="w-full">
      <div className="w-full h-full p-4 border border-gray-300 shadow-lg rounded-xl overflow-auto relative">
        <h1 className="mb-3 font-bold">Profile Config</h1>
        <div className="flex space-x-4">
          <img src="avatar-default.svg" className="size-[110px]" />
            <form className="w-[60%]">
            <Textbox id="newUsername" labelContent="Display name" name="newUsername" placeholder="username fetched from backend"/>
            <Buttons buttonText="Submit" buttonsId="changeProfile" buttonName="changeProfile"/>
            </form>
        </div>
      </div>
    </div>
  )
}

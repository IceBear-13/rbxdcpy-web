import React from "react";
import Textbox from "./Textbox";
import Passwordbox from "./Password";
import Buttons from "./Buttons";

export const ProfileDashboard = () => {
  return(
    <div className="w-full">
      <div className="w-full h-full p-4 border border-gray-300 shadow-lg rounded-xl overflow-auto relative">
        <div className="flex space-x-4 overflow-auto">
          <img src="avatar-default.svg" className="size-[110px]" />
          <form className="w-[60%]">
            <Textbox id="newUsername" labelContent="Username" name="newUsername" placeholder="username fetched from backend"/>
            <Textbox id="newEmail" labelContent="Email" name="newEmail" placeholder="email fetched from backend" />
            <Passwordbox id="pwdForChange" labelContent="Password" name="pwdForChange" placeholder="Required for status update"/>
            <Buttons buttonText="Submit" buttonsId="changeProfile" buttonName="changeProfile"/>
          </form>
        </div>
      </div>
    </div>
  )
}

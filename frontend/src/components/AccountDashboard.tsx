import { useState } from "react";
import Textbox from "./Textbox";
import Passwordbox from "./Password";
import Buttons from "./Buttons";

export const AccountConfig = () => {
  const [discordLinked, setDiscordLinked] = useState(false);

  setDiscordLinked(true);
  return(
    <div className="w-full">
      <div className="w-full h-full p-4 border border-gray-300 shadow-lg rounded-xl overflow-auto relative">
        <h1 className="mb-3 font-bold">Account Config</h1>
        <div className="flex space-x-4">
          <img src="avatar-default.svg" className="size-[110px]" />
            <form className="w-[60%]">
            <Textbox id="newUsername" labelContent="Username" name="newUsername" placeholder="username fetched from backend"/>
            <Textbox id="newEmail" labelContent="Email" name="newEmail" placeholder="email fetched from backend" />
            <Passwordbox id="pwdForChange" labelContent="Password" name="pwdForChange" placeholder="Required for profile update"/>
            <Buttons buttonText="Submit" buttonsId="changeProfile" buttonName="changeProfile"/>
            {!discordLinked && (
              <Buttons buttonText="Link Discord account" buttonsId="linkDiscord" buttonName="linkDiscord" />
            )}
            </form>
        </div>
      </div>
    </div>
  )
}

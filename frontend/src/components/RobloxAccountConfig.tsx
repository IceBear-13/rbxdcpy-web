import Textbox from "./Textbox"
import Passwordbox from "./Password"
import Buttons from "./Buttons"

export const RobloxAccountConfig = () => {
      return(
        <div className="w-full">
          <div className="w-full h-full p-4 border border-gray-300 shadow-lg rounded-xl overflow-auto relative">
            <h1 className="mb-3 font-bold">Roblox Account</h1>
            <div className="flex space-x-4 items-center">
              <img src="avatar-default.svg" className="size-[110px]" alt="Roblox Avatar" />
              <div>
                <h2 className="text-sm">Discord ID: Discord ID</h2>
                <h2 className="text-sm">Roblox ID: Roblox ID</h2>
                <Buttons buttonText="Link a new Roblox account" buttonName="linkRoblox" buttonsId="linkRoblox"></Buttons>
              </div>
            </div>
          </div>
        </div>
      )
}
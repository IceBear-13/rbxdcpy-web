import { Header } from "../components/Header";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { AccountConfig } from "../components/AccountDashboard";
import { RobloxAccountConfig } from "../components/RobloxAccountConfig";
import { ProfileConfig } from "../components/ProfileDashboard";

export const Dashboard = () => {
    return(
        <div className="h-screen">
            <Header />
            <div className="pt-[100px] h-full flex">
              <ProfileSidebar />
              <div className="w-full md:w-[80%] p-2 overflow-scroll flex flex-col space-y-3">
                <AccountConfig />
                <ProfileConfig />
                <RobloxAccountConfig />
              </div>
            </div>
        </div>
    )
}

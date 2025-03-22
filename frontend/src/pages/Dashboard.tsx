import React from "react";
import { Header } from "../components/Header";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ProfileDashboard } from "../components/ProfileDashboard";
import { RobloxAccountConfig } from "../components/RobloxAccountConfig";

export const Dashboard = () => {
    return(
        <div className="h-screen">
            <Header />
            <div className="pt-[100px] h-full flex">
              <ProfileSidebar />
              <div className="w-full md:w-[80%] p-2 overflow-scroll flex flex-col space-y-3">
                <ProfileDashboard />
                <RobloxAccountConfig />
              </div>
            </div>
        </div>
    )
}

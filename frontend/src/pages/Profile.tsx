import React from "react";
import { Header } from "../components/Header";
import { ProfileSidebar } from "../components/ProfileSidebar";
import { ProfileDashboard } from "../components/ProfileDashboard";

export const Profile = () => {
    return(
        <div className="h-screen">
            <Header />
            <div className="pt-[100px] h-full flex">
              <ProfileSidebar />
              <div className="w-full md:w-[80%] p-2">
                <ProfileDashboard />
              </div>
            </div>
        </div>
    )
}

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";

const TeamLeaderDashboard = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          md:ml-64
          min-h-screen
          px-4 sm:px-6 lg:px-8
          pt-6
        "
      >
        <Outlet />
      </main>
    </div>
  );
};

export default TeamLeaderDashboard;

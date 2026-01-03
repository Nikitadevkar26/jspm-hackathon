import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          flex-1
          md:ml-64
          pt-4 md:pt-6
          px-4 sm:px-6 lg:px-8
        "
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

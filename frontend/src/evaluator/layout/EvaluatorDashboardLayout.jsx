// evaluator/layout/EvaluatorDashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import EvaluatorSidebar from "../evaluator-components/evaluatorSidebar";

const EvaluatorDashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <EvaluatorSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default EvaluatorDashboardLayout;

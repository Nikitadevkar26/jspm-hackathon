import React from "react";
import EvaluatorSidebar from "../evaluator-components/evaluatorSidebar";
import EvaluatorDashboardContent from "../evaluator-content/evaluatorDashboardContent";

const EvaluatorDashboardLayout = () => {
  const evaluatorUser = JSON.parse(localStorage.getItem("evaluatorUser"));

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <EvaluatorSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        <EvaluatorDashboardContent evaluator={evaluatorUser} />
      </div>
    </div>
  );
};

export default EvaluatorDashboardLayout;

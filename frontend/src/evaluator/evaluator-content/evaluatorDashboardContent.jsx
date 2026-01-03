import React from "react";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";

const EvaluatorDashboardContent = ({ evaluator }) => {
  return (
    <div className="max-w-5xl space-y-6">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome, {evaluator?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Evaluator Dashboard
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-sm">Logged in as</p>
        <p className="font-semibold text-red-600 break-all">
          {evaluator?.email}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Organization:</span>{" "}
            {evaluator?.organization || "—"}
          </div>
          <div>
            <span className="font-semibold">Department:</span>{" "}
            {evaluator?.department || "—"}
          </div>
          <div>
            <span className="font-semibold">Role:</span>{" "}
            {evaluator?.role || "—"}
          </div>
          <div>
            <span className="font-semibold">Location:</span>{" "}
            {evaluator?.city}, {evaluator?.state}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={<ClipboardList className="text-blue-500" />}
          title="Assigned Teams"
          value="—"
        />
        <StatCard
          icon={<CheckCircle className="text-green-500" />}
          title="Evaluated"
          value="—"
        />
        <StatCard
          icon={<Clock className="text-yellow-500" />}
          title="Pending"
          value="—"
        />
      </div>

    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default EvaluatorDashboardContent;

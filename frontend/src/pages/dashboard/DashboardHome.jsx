import React from "react";
import {
  Users,
  FileText,
  CheckCircle,
  Activity
} from "lucide-react";

const DashboardHome = () => {
  const teamUser = JSON.parse(localStorage.getItem("teamUser"));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome, Team Leader 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your team, submissions, and project progress from here
        </p>
      </div>

      {/* ================= USER INFO CARD ================= */}
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-semibold text-red-600 break-all">
              {teamUser?.email || "teamleader@example.com"}
            </p>
          </div>

          <div className="flex gap-4 text-sm">
            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
              Active
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
              Team Leader
            </span>
          </div>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <StatCard
          icon={<Users size={22} />}
          title="Team Members"
          value="4"
          subtitle="Registered members"
        />

        <StatCard
          icon={<FileText size={22} />}
          title="Project"
          value="1"
          subtitle="Active submission"
        />

        <StatCard
          icon={<CheckCircle size={22} />}
          title="Status"
          value="Pending"
          subtitle="Under review"
        />

        <StatCard
          icon={<Activity size={22} />}
          title="Last Update"
          value="Today"
          subtitle="Recently modified"
        />
      </div>

      {/* ================= FEATURES / INFO ================= */}
      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          What you can do from here
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            View and manage your team members
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            Monitor project submission details
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            Track evaluation and review status
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600">•</span>
            Stay updated with dashboard notifications
          </li>
        </ul>
      </div>
    </div>
  );
};

/* ================= STAT CARD COMPONENT ================= */
const StatCard = ({ icon, title, value, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-red-100 text-red-600">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-700">
        {title}
      </h3>
    </div>

    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
  </div>
);

export default DashboardHome;

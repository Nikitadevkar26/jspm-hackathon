import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";

const API_BASE_URL = "http://localhost:8088";

const EvaluatorDashboardContent = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    assignedTeams: "—",
    evaluatedTeams: "—",
    pendingTeams: "—"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("evaluatorToken");

        if (!token) {
          setError("Session expired. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/evaluators/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const result = response.data;

        if (!result?.success) {
          throw new Error(result?.message);
        }

        setProfile(result.data.evaluator);
        setStats(result.data.stats);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome, {profile?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">Evaluator Dashboard</p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-sm">Logged in as</p>
        <p className="font-semibold text-red-600 break-all">
          {profile?.email}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Organization:</span>{" "}
            {profile.organization}
          </div>
          <div>
            <span className="font-semibold">Department:</span>{" "}
            {profile.department}
          </div>
          <div>
            <span className="font-semibold">Role:</span>{" "}
            {profile.role}
          </div>
          <div>
            <span className="font-semibold">Location:</span>{" "}
            {profile.city}, {profile.state}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon={<ClipboardList className="text-blue-500" />}
          title="Assigned Teams"
          value={stats.assignedTeams}
        />
        <StatCard
          icon={<CheckCircle className="text-green-500" />}
          title="Evaluated"
          value={stats.evaluatedTeams}
        />
        <StatCard
          icon={<Clock className="text-yellow-500" />}
          title="Pending"
          value={stats.pendingTeams}
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
    <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default EvaluatorDashboardContent;

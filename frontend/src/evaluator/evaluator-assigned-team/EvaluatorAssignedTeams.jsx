// src/evaluator/evaluator-assigned-team/EvaluatorAssignedTeams.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8088";

const EvaluatorAssignedTeams = () => {
  const navigate = useNavigate();

  const [assignedTeams, setAssignedTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssignedTeams = async () => {
      try {
        const token = localStorage.getItem("evaluatorToken");

        if (!token) {
          setError("Session expired. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/evaluators/assigned-teams`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data?.success) {
          throw new Error("Failed to fetch assigned teams");
        }

        setAssignedTeams(response.data.data || []);
      } catch (err) {
        console.error("Assigned teams fetch error:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load assigned teams"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTeams();
  }, []);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading assigned projects...
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-xl mx-auto">
        {error}
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (assignedTeams.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No projects assigned yet.
      </div>
    );
  }

  const evaluatorEmail = JSON.parse(
    localStorage.getItem("evaluator")
  )?.email;

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Assigned Projects
      </h1>

      {assignedTeams.map((team) => (
        <div
          key={team.team_id}
          className={`rounded-xl shadow-md p-5 flex justify-between items-center transition
    ${team.is_scored
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white hover:shadow-lg"
            }`}
        >
          <div>
            <h2 className="font-semibold text-red-600 text-lg">
              {team.project_title}
            </h2>

            <p className="text-sm text-gray-500">
              Team: {team.team_name}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Assigned on{" "}
              {new Date(team.assigned_at).toLocaleDateString()}
            </p>
          </div>

          {/* ✅ FIXED BUTTON */}
          <button
            disabled={team.is_scored}
            onClick={() =>
              !team.is_scored &&
              navigate(
                `/evaluator/evaluator-dashboard/evaluator-scoring-page/${team.team_id}`
              )
            }
            className={`px-5 py-2 rounded-lg font-semibold transition
    ${team.is_scored
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
              }`}
          >
            {team.is_scored ? "Evaluated" : "Start Scoring"}
          </button>

        </div>
      ))}
    </div>
  );
};

export default EvaluatorAssignedTeams;

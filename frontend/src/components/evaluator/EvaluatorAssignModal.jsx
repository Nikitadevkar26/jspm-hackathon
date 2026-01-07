"use client";

import { Edit, List, Send, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8088/api";

export default function EvaluatorAssignModal({
  evaluator,
  onClose,
  onSuccess,
}) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ============================
     FETCH UNASSIGNED APPROVED TEAMS
     (one team can be assigned only once)
  ============================ */
  useEffect(() => {
    if (!evaluator) return;

    const fetchUnassignedTeams = async () => {
      try {
        setError("");

        const token = localStorage.getItem("adminToken");

        const { data } = await axios.get(
          `${BASE_URL}/registrations/ready-for-evaluation`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        // Backend already filters unassigned teams,
        // but keep this safe on frontend as well
        setTeams(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch teams error:", err);
        setError("Failed to load available teams.");
        setTeams([]);
      }
    };

    fetchUnassignedTeams();
  }, [evaluator]);

  // If evaluator is not provided, do not render modal
  if (!evaluator) return null;

  /* ============================
     ASSIGN TEAM → EVALUATOR
  ============================ */
  const assignEvaluator = async () => {
    if (!selectedTeam) return;

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      await axios.post(
        `${BASE_URL}/assignments`,
        {
          team_id: selectedTeam,
          evaluator_id: evaluator.evaluator_id,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      // Refresh parent list and close modal
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Assignment error:", err);

      // Backend sends 409 if team already assigned
      setError(
        err.response?.data?.message ||
          "This team is already assigned to an evaluator."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">

        {/* HEADER */}
        <div className="bg-indigo-600 text-white p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <Edit size={18} />
            Assign Team → {evaluator.name}
          </h3>
          <button onClick={onClose}>
            <XCircle />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <p className="text-sm text-gray-600">
            Evaluator Expertise:{" "}
            <span className="font-semibold">
              {evaluator.expertise || "N/A"}
            </span>
          </p>

          <label className="text-sm font-semibold flex items-center gap-1">
            <List size={14} /> Select Unassigned Team
          </label>

          <select
            className="w-full border rounded-lg p-3"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option value="">Choose a Team</option>

            {teams.map((team) => (
              <option key={team.team_id} value={team.team_id}>
                {team.team_name} — {team.project_title}
              </option>
            ))}
          </select>

          {teams.length === 0 && !error && (
            <p className="text-sm text-gray-500">
              No unassigned approved teams available.
            </p>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={!selectedTeam || loading}
            onClick={assignEvaluator}
            className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-1"
          >
            <Send size={14} />
            {loading ? "Assigning..." : "Confirm Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
}
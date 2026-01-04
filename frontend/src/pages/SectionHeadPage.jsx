"use client";

import { CheckCircle, Edit, Filter, Send, Users, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import EvaluatorAssignModal from "../components/EvaluatorAssignModal";

/**
 * Backend mount:
 * app.use("/api/registrations", registrationRoutes);
 */
const BASE_URL = "http://localhost:5001/api/registrations";

export default function SectionHeadPage() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filters, setFilters] = useState({ theme: "All", status: "All" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================
     FETCH TEAMS READY FOR EVALUATION
  ============================ */
  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BASE_URL}/ready-for-evaluation`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        }
      });
      if (!res.ok) throw new Error(`API Error ${res.status}`);

      const data = await res.json();
      setTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("FETCH TEAMS ERROR:", err);
      setError("Failed to load teams ready for evaluation.");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  /* ============================
     FILTERING
  ============================ */
  const themes = useMemo(
    () => ["All", ...new Set(teams.map(t => t.theme))],
    [teams]
  );

  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      const themeMatch =
        filters.theme === "All" || team.theme === filters.theme;

      const statusMatch =
        filters.status === "All" ||
        (filters.status === "Assigned" && team.evaluator_name) ||
        (filters.status === "Unassigned" && !team.evaluator_name);

      return themeMatch && statusMatch;
    });
  }, [teams, filters]);

  /* ============================
     STATUS BADGE
  ============================ */
  const StatusBadge = ({ evaluator }) =>
    evaluator ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
        <CheckCircle size={12} />
        {evaluator}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">
        <XCircle size={12} />
        Unassigned
      </span>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <Users className="text-indigo-600" />
          Evaluation Management Panel
        </h1>
        <p className="text-gray-600 mt-2">
          Assign evaluators to approved teams and monitor evaluation progress.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* FILTER BAR */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          Teams Ready for Evaluation ({filteredTeams.length})
        </h2>

        <div className="flex items-center gap-4">
          <Filter size={16} className="text-gray-500" />

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={filters.theme}
            onChange={e =>
              setFilters(f => ({ ...f, theme: e.target.value }))
            }
          >
            {themes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={filters.status}
            onChange={e =>
              setFilters(f => ({ ...f, status: e.target.value }))
            }
          >
            <option value="All">All</option>
            <option value="Assigned">Assigned</option>
            <option value="Unassigned">Unassigned</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-4 text-left">Team</th>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left">Theme</th>
              <th className="p-4 text-center">Evaluator</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && filteredTeams.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No approved teams available for evaluation.
                </td>
              </tr>
            )}

            {filteredTeams.map(team => (
              <tr
                key={team.team_id}
                className="border-t hover:bg-indigo-50 transition"
              >
                {/* ✅ FIXED TEAM NAME */}
                <td className="p-4 font-semibold text-gray-900">
                  {team.team_name}
                </td>

                <td className="p-4 text-gray-700">
                  {team.project_title}
                </td>

                <td className="p-4 text-indigo-600 font-medium">
                  {team.theme}
                </td>

                <td className="p-4 text-center">
                  <StatusBadge evaluator={team.evaluator_name} />
                </td>

                <td className="p-4 text-center space-x-2 flex">
                  <button
                    onClick={() => setSelectedTeam(team)}
                    className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    <Edit size={14} />
                    {team.evaluator_name ? "Re-assign" : "Assign"}
                  </button>

                  {team.evaluator_name && (
                    <button className="inline-flex items-center gap-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm">
                      <Send size={14} />
                      Notify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ASSIGN MODAL */}
      {selectedTeam && (
        <EvaluatorAssignModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onSuccess={fetchTeams}
        />
      )}
    </div>
  );
}

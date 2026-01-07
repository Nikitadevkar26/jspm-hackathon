"use client";

import { Edit, List, Send, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8088/api";

export default function EvaluatorAssignModal({ team, onClose, onSuccess }) {
  const [evaluators, setEvaluators] = useState([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ============================
     FETCH APPROVED EVALUATORS
  ============================ */
  useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const { data } = await axios.get(
          `${BASE_URL}/evaluators?status=Approved`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        setEvaluators(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch evaluators error:", err);
        setError("Failed to load evaluators");
        setEvaluators([]);
      }
    };

    fetchEvaluators();
  }, []);

  if (!team) return null;

  /* ============================
     THEME-BASED SUGGESTIONS
  ============================ */
  const suggested = useMemo(
    () =>
      (Array.isArray(evaluators) ? evaluators : []).filter((e) =>
        e.expertise?.includes(team.theme)
      ),
    [evaluators, team.theme]
  );

  const others = useMemo(
    () =>
      (Array.isArray(evaluators) ? evaluators : []).filter(
        (e) => !e.expertise?.includes(team.theme)
      ),
    [evaluators, team.theme]
  );

  /* ============================
     SUBMIT ASSIGNMENT
  ============================ */
  const assignEvaluator = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      await axios.post(
        `${BASE_URL}/assignments`,
        {
          team_id: team.team_id,
          evaluator_id: selectedEvaluator,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      onSuccess(); // refresh teams
      onClose();   // close modal
    } catch (err) {
      console.error("Assignment error:", err);
      setError(
        err.response?.data?.message || "Failed to assign evaluator."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl">

        {/* HEADER */}
        <div className="bg-indigo-600 text-white p-4 rounded-t-xl flex justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <Edit size={18} /> Assign Evaluator — {team.team_name}
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
            Project: <b>{team.project_title}</b> (Theme:{" "}
            <b>{team.theme}</b>)
          </p>

          <label className="text-sm font-semibold flex items-center gap-1">
            <List size={14} /> Select Evaluator
          </label>

          <select
            className="w-full border rounded-lg p-3"
            value={selectedEvaluator}
            onChange={(e) => setSelectedEvaluator(e.target.value)}
          >
            <option value="">Choose an Evaluator</option>

            {suggested.length > 0 && (
              <optgroup label={`Suggested Experts for ${team.theme}`}>
                {suggested.map((ev) => (
                  <option
                    key={ev.evaluator_id}
                    value={ev.evaluator_id}
                  >
                    {ev.name} (Expert)
                  </option>
                ))}
              </optgroup>
            )}

            {others.length > 0 && (
              <optgroup label="Other Evaluators">
                {others.map((ev) => (
                  <option
                    key={ev.evaluator_id}
                    value={ev.evaluator_id}
                  >
                    {ev.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
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
            disabled={!selectedEvaluator || loading}
            onClick={assignEvaluator}
            className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-1"
          >
            <Send size={14} /> Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

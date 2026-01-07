"use client";

import { CheckCircle, Filter, Users, UserPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import EvaluatorAssignModal from "../components/evaluator/EvaluatorAssignModal";

/**
 * Backend mount:
 * app.use("/api/admin/evaluators", evaluatorAdminRoutes);
 */
const BASE_URL = "http://localhost:8088/api/admin/evaluators";

export default function SectionHeadPage() {
  const [evaluators, setEvaluators] = useState([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [filters, setFilters] = useState({ expertise: "All" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================
     FETCH APPROVED EVALUATORS
  ============================ */
  const fetchEvaluators = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const { data } = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ only approved evaluators
      const approvedEvaluators = Array.isArray(data)
        ? data.filter((e) => e.status === "Approved")
        : [];

      setEvaluators(approvedEvaluators);
    } catch (err) {
      console.error("FETCH EVALUATORS ERROR:", err);
      setError("Failed to load approved evaluators.");
      setEvaluators([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluators();
  }, []);

  /* ============================
     FILTERING (BY EXPERTISE)
  ============================ */
  const expertiseList = useMemo(
    () => ["All", ...new Set(evaluators.map((e) => e.expertise).filter(Boolean))],
    [evaluators]
  );

  const filteredEvaluators = useMemo(() => {
    return evaluators.filter((evaluator) => {
      return (
        filters.expertise === "All" ||
        evaluator.expertise === filters.expertise
      );
    });
  }, [evaluators, filters]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold flex items-center gap-3">
          <Users className="text-indigo-600" />
          Assign Approved Evaluators To Teams
        </h1>
        <p className="text-gray-600 mt-2">
          View approved evaluators and assign them to teams.
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
          Evaluators ({filteredEvaluators.length})
        </h2>

        <div className="flex items-center gap-4">
          <Filter size={16} className="text-gray-500" />

          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={filters.role}
            onChange={(e) =>
              setFilters((f) => ({ ...f, role: e.target.value }))
            }
          >
            {expertiseList.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              {/* <th className="p-4 text-left">Role</th> */}
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && filteredEvaluators.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No approved evaluators available.
                </td>
              </tr>
            )}

            {filteredEvaluators.map((evaluator) => (
              <tr
                key={evaluator.evaluator_id}
                className="border-t hover:bg-indigo-50 transition"
              >
                <td className="p-4 font-semibold text-gray-900">
                  {evaluator.name}
                </td>

                <td className="p-4 text-gray-700">
                  {evaluator.email}
                </td>

                {/* <td className="p-4 text-indigo-600 font-medium">
                  {evaluator.role || "—"}
                </td> */}

                <td className="p-4 text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                    <CheckCircle size={12} />
                    Approved
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => setSelectedEvaluator(evaluator)}
                    className="inline-flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    <UserPlus size={14} />
                    Assign to Team
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ASSIGN MODAL */}
      {selectedEvaluator && (
        <EvaluatorAssignModal
          evaluator={selectedEvaluator}
          onClose={() => setSelectedEvaluator(null)}
          onSuccess={fetchEvaluators}
        />
      )}
    </div>
  );
}